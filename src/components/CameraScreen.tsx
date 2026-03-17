import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { categorize } from "../utils/categorizer";
import { autoCrop } from "../utils/imageCrop";
import { runOCR } from "../utils/ocr";
import { type ParsedReceipt, parseReceipt } from "../utils/parser";
import ReviewCard from "./ReviewCard";

type ParsedWithCategory = ParsedReceipt & {
  category: string;
};

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [parsed, setParsed] = useState<ParsedWithCategory | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission, requestPermission]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 300,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scanAnim]);

  const captureAndScan = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();
    if (!photo?.uri) return;

    const croppedUri = await autoCrop(photo.uri);
    const raw = await runOCR(croppedUri);
    const parsedData = parseReceipt(raw);

    const category = categorize(parsedData.merchant);

    setParsed({ ...parsedData, category });
    setReviewMode(true);
  };

  const handleSave = () => {
    setReviewMode(false);
    setParsed(null);
  };

  const handleDiscard = () => {
    setReviewMode(false);
    setParsed(null);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} />

      <View style={styles.overlay}>
        <View style={styles.frame} />
        <Animated.View
          style={[styles.laser, { transform: [{ translateY: scanAnim }] }]}
        />
      </View>

      {!reviewMode && (
        <View style={styles.capture}>
          <Text style={styles.button} onPress={captureAndScan}>
            Scan
          </Text>
        </View>
      )}

      {reviewMode && parsed && (
        <ReviewCard
          data={`₹${parsed.amount ?? "-"}\n${parsed.date ?? "-"}\n${parsed.merchant ?? "-"}\nCategory: ${parsed.category}`}
          confidence={parsed.confidence}
          onSave={handleSave}
          onDiscard={handleDiscard}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    width: 280,
    height: 380,
    borderWidth: 2,
    borderColor: "#22C55E",
    borderRadius: 12,
  },
  laser: {
    position: "absolute",
    width: 280,
    height: 2,
    backgroundColor: "#22C55E",
  },
  capture: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
    color: "#000",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
