import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useApp } from "@/context/AppContext";

export default function QuantityScreen() {
  const { productId, productName } = useLocalSearchParams();

  const { addHotDogs } = useApp();

  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    addHotDogs(Number(productId), quantity);

    router.push("/dashboard");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {productName}
      </Text>

      <Text style={styles.subtitle}>
        How many?
      </Text>

      <Text style={styles.quantity}>
        {quantity}
      </Text>

      <View style={styles.row}>
        <Pressable
          style={styles.smallButton}
          onPress={() =>
            setQuantity(Math.max(1, quantity - 1))
          }
        >
          <Text style={styles.buttonText}>
            -
          </Text>
        </Pressable>

        <Pressable
          style={styles.smallButton}
          onPress={() =>
            setQuantity(quantity + 1)
          }
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.addButton}
        onPress={handleAdd}
      >
        <Text style={styles.buttonText}>
          Add to my distance
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
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 18,
    marginVertical: 20,
  },

  quantity: {
    fontSize: 50,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 20,
  },

  smallButton: {
    backgroundColor: "#F5A623",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },

  addButton: {
    backgroundColor: "#F5A623",
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
