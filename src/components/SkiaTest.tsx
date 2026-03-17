import { Canvas, Circle } from "@shopify/react-native-skia";
import { View } from "react-native";

export default function SkiaTest() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Canvas style={{ width: 200, height: 200 }}>
        <Circle cx={100} cy={100} r={80} color="#22C55E" />
      </Canvas>
    </View>
  );
}
