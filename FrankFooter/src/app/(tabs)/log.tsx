import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { hotdogs } from "@/data/hotdogs";

export default function LogScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        What did you eat?
      </Text>

      <Text style={styles.subtitle}>
        Choose a brand
      </Text>

      {hotdogs.map((brand) => (
        <Pressable
          key={brand.id}
          style={styles.hotdogButton}
          onPress={() =>
            router.push({
              pathname: "/product",
              params: {
                brandId: brand.id,
              },
            })
          }
        >
          <Text style={styles.buttonText}>
            🌭 {brand.name}
          </Text>
        </Pressable>
      ))}
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

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
