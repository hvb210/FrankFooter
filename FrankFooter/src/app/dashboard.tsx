import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useApp } from "@/context/AppContext";

export default function DashboardScreen() {
  const router = useRouter();

  const { totalInches, goalInches } = useApp();

  const feet = Math.floor(totalInches / 12);
  const remainingInches = (totalInches % 12).toFixed(1);

  const progress = Math.min(
  totalInches / goalInches,
  1
  );

const progressPercent = (progress * 100).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        FrankFooter
      </Text>

      <Text style={styles.label}>
        Your Goal
      </Text>

      <Text style={styles.value}>
        {(goalInches / 63360).toFixed(1)} Mile Goal
      </Text>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push("/goal")}
        >
        <Text style={styles.secondaryButtonText}>
        Change Goal
        </Text>
      </Pressable>

      <Text style={styles.label}>
        Current Distance
      </Text>

      <Text style={styles.value}>
        {feet} ft {remainingInches} in
      </Text>

    <View style={styles.progressContainer}>
      <View
        style={[
          styles.progressBar,
          { width: `${progressPercent}%` },
        ]}
        />
      </View>

      <Text style={styles.progressText}>
        {progressPercent}% complete
        </Text>

      <Text style={styles.label}>
        Next Landmark
      </Text>

      <Text style={styles.value}>
        Start eating to unlock achievements!
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/log")}
      >
        <Text style={styles.buttonText}>
          Log a Hot Dog 🌭
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
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
  },

  label: {
    fontSize: 18,
    marginTop: 20,
  },

  value: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#F5A623",
    padding: 15,
    borderRadius: 25,
    marginTop: 40,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  secondaryButton: {
  marginTop: 10,
  },

  secondaryButtonText: {
    color: "#208AEF",
    fontSize: 16,
    fontWeight: "600",
  },

  progressContainer: {
  height: 20,
  width: "80%",
  backgroundColor: "#eee",
  borderRadius: 10,
  overflow: "hidden",
  marginTop: 20,
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#F5A623",
  },

  progressText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
