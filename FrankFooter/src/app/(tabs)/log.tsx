import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { hotdogs } from "@/data/hotdogs";
import { useApp } from "@/context/AppContext";

export default function LogScreen() {
  const router = useRouter();

  const { customHotDogs, deleteCustomHotDog } = useApp();

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

      {customHotDogs.length > 0 && (
        <Text style={styles.subtitle}>
          My Custom Hot Dogs
        </Text>
      )}

      {customHotDogs.map((dog) => (
        <View key={dog.id} style={styles.customRow}>
          <Pressable
            style={styles.hotdogButton}
            onPress={() =>
              router.push({
                pathname: "/quantity",
                params: {
                  productName: dog.name,
                  length_inches: dog.length_inches,
                },
              })
            }
          >
            <Text style={styles.buttonText}>
              🌭 {dog.name}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => deleteCustomHotDog(dog.id)}
          >
            <Text style={styles.deleteText}>
              Delete
            </Text>
          </Pressable>
        </View>
      ))}

        <Pressable
        style={styles.hotdogButton}
        onPress={() => router.push("/custom")}
      >
        <Text style={styles.buttonText}>
          ➕ Create Custom Hot Dog
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

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  customRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});
