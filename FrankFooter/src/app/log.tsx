import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { hotdogs } from "@/data/hotdogs";
import { router } from "expo-router";

export default function LogScreen() {
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        What did you eat?
      </Text>

      <Text style={styles.subtitle}>
        Choose your hot dog
      </Text>

      {hotdogs.map((brand) => (
  <Pressable
    key={brand.id}
    style={styles.hotdogButton}
    onPress={() => {
      router.push({
        pathname: "/product",
        params: { brand: brand.name },
      });
    }}
  >
    <Text style={styles.buttonText}>
      🌭 {brand.name}
    </Text>
  </Pressable>
))}

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
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <Pressable
          style={styles.smallButton}
          onPress={() =>
            setQuantity(quantity + 1)
          }
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <Pressable style={styles.addButton}>
        <Text style={styles.buttonText}>
          Add to my distance 🌭
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
  hotdogButton: {
    backgroundColor: "#F5A623",
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  quantity: {
    fontSize: 40,
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
