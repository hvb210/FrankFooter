import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useApp } from "@/context/AppContext";

export default function HomeScreen() {
  const router = useRouter();
  const { goalSet } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (goalSet) {
        router.replace("/(tabs)/dashboard");
      } else {
        router.replace("/goal");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [goalSet]);

  return <View />;
}
