import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text
        style={{
          fontFamily: "PlusJakartaSans_600SemiBold",
          fontSize: 20,
          color: "#E2E8F0",
        }}
      >
        FlowSpend
      </Text>
      <StatusBar style="light" />
    </View>
  );
}
