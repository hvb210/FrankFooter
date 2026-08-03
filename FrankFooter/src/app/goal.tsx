import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function GoalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Set Your Goal
      </Text>

      <Text style={styles.subtitle}>
        How far do you want to eat?
      </Text>

      <Pressable
        style={styles.goalButton}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.goalText}>
          1 Mile
        </Text>
      </Pressable>

      <Pressable
        style={styles.goalButton}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.goalText}>
          Custom Goal
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 20,
  },
  goalButton: {
    backgroundColor: "#F5A623",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 15,
  },
  goalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
