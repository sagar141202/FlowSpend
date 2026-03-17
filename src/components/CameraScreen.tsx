import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Animated, Button, StyleSheet, Text, View } from "react-native";
import { runOCR } from "../utils/ocr";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [text, setText] = useState("");
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

    const result = await runOCR(photo.uri);
    setText(result);
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

      <View style={styles.bottom}>
        <Button title="Scan" onPress={captureAndScan} />
        <Text numberOfLines={2} style={{ color: "#fff" }}>
          {text}
        </Text>
      </View>
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
  bottom: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
