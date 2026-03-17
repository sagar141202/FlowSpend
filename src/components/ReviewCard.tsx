import * as Haptics from "expo-haptics";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  data: string;
  confidence: number;
  onSave: () => void;
  onDiscard: () => void;
};

export default function ReviewCard({
  data,
  confidence,
  onSave,
  onDiscard,
}: Props) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Animated.timing(pan, {
            toValue: { x: SCREEN_WIDTH, y: 0 },
            duration: 200,
            useNativeDriver: true,
          }).start(onSave);
        } else if (gesture.dx < -120) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          Animated.timing(pan, {
            toValue: { x: -SCREEN_WIDTH, y: 0 },
            duration: 200,
            useNativeDriver: true,
          }).start(onDiscard);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const isLow = confidence < 0.8;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          isLow && { borderColor: "#EF4444", borderWidth: 2 },
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              {
                rotate: pan.x.interpolate({
                  inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                  outputRange: ["-15deg", "0deg", "15deg"],
                }),
              },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.title}>Review</Text>

        {isLow && (
          <Text style={styles.warning}>Low confidence — please verify</Text>
        )}

        <Text style={styles.text}>{data}</Text>
        <Text style={styles.hint}>Swipe → Save | ← Discard</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    color: "#22C55E",
    marginBottom: 10,
  },
  warning: {
    color: "#EF4444",
    marginBottom: 10,
  },
  text: {
    color: "#E2E8F0",
    marginBottom: 20,
  },
  hint: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
  },
});
