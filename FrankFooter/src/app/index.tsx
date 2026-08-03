import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
  <View style={styles.container}>
    <Text style={styles.hotdog}>🌭</Text>

    <Text style={styles.title}>
      FrankFooter
    </Text>

    <Text style={styles.subtitle}>
      Track your lifetime hot dog distance.
    </Text>

    <Pressable
      style={styles.button}
      onPress={() => router.push("/goal")}
    >
      <Text style={styles.buttonText}>
        Get Started
      </Text>
    </Pressable>

  </View>
);
}

const router = useRouter();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  hotdog: {
    fontSize: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },

  button: {
  marginTop: 40,
  backgroundColor: "#F5A623",
  paddingVertical: 15,
  paddingHorizontal: 40,
  borderRadius: 25,
},

buttonText: {
  fontSize: 18,
  fontWeight: "bold",
},

});
