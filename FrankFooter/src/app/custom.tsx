import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useApp } from "@/context/AppContext";

export default function CustomScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [length, setLength] = useState("");

  const { addCustomHotDog } = useApp();

  function saveCustomDog() {
    addCustomHotDog(
      name || "Custom Hot Dog",
      Number(length)
    );

    router.push("/log");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>
        Create Custom Hot Dog
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Hot dog name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Length in inches"
        value={length}
        onChangeText={setLength}
        keyboardType="numeric"
      />

      <Pressable
        style={styles.button}
        onPress={saveCustomDog}
      >
        <Text style={styles.buttonText}>
          Save Custom Hot Dog
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
    marginBottom: 30,
  },

  input: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#F5A623",
    padding: 15,
    borderRadius: 25,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
