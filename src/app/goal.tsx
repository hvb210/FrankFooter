import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { useRouter } from "expo-router";
import { useApp } from "@/context/AppContext";
import { useState } from "react";

export default function GoalScreen() {
  const router = useRouter();
  const { setGoalInches, setGoalSet, goalSet, setStartingDistance } = useApp();
  const [customFeet, setCustomFeet] = useState("");
  const [error, setError] = useState("");
  const [startingFeet, setStartingFeet] = useState("");

  function saveGoal(inches: number) {
    setGoalInches(inches);
    setGoalSet(true);

    if (!goalSet && startingFeet) {
      setStartingDistance(Number(startingFeet) * 12);
    }

    router.replace("/(tabs)/dashboard");
  }

  function saveCustomGoal() {
    const feet = Number(customFeet);

    if (feet > 5280) {
      setError("Maximum goal is 1 mile (5,280 feet).");
      return;
    }

    if (feet <= 0) {
      setError("Please enter a distance greater than 0.");
      return;
    }

    setError("");
    saveGoal(feet * 12);
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>
        {goalSet ? "Update Your Goal" : "Set Your Goal"}
        </Text>

        <Text style={styles.subtitle}>
        {goalSet
          ? "Choose a new distance"
          : "How far do you want to eat?"}
          </Text>

          <Pressable
          style={styles.goalButton}
          onPress={() => saveGoal(63360)}
          >
          <Text style={styles.goalText}>
            1 Mile
            </Text>
            </Pressable>

            <TextInput
            style={styles.input}
            placeholder="Custom goal (feet)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={customFeet}
            onChangeText={setCustomFeet}
            />
      {!goalSet && (
        <>
          <Text style={styles.subtitle}>
            Already have a hot dog history?
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Total Feet Already Eaten"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={startingFeet}
            onChangeText={setStartingFeet}
          />
        </>
      )}

            {error ? (
              <Text style={styles.error}>
              {error}
              </Text>
            ) : null}

            <Pressable
            style={styles.goalButton}
            onPress={saveCustomGoal}
            >
            <Text style={styles.goalText}>
            Save Custom Goal
            </Text>
            </Pressable>

            </View>
          </TouchableWithoutFeedback>
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

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
},

  error: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
},

});
