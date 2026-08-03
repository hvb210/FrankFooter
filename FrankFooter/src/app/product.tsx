import { StyleSheet, Text, View, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { hotdogs } from "@/data/hotdogs";
import { useRouter } from "expo-router";

export default function ProductScreen() {
  const { brandId } = useLocalSearchParams();
  const router = useRouter();

  const selectedBrand = hotdogs.find(
    (item) => item.id === Number(brandId)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedBrand?.name}
      </Text>

      <Text style={styles.subtitle}>
        Choose a product
      </Text>

      {selectedBrand?.products.map((product) => (
        <Pressable
    key={product.id}
    style={styles.hotdogButton}
    onPress={() =>
      router.push({
        pathname: "/quantity",
        params: {
          productId: product.id,
          productName: product.name,
        },
      })
    }
  >
          <Text style={styles.buttonText}>
            {product.name}
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
