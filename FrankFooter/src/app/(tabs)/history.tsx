import { StyleSheet, Text, View, Pressable } from "react-native";
import { useApp } from "@/context/AppContext";
import { hotdogs } from "@/data/hotdogs";

export default function HistoryScreen() {
  const { logEntries, deleteLogEntry } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hot Dog History
      </Text>

      {logEntries.length === 0 ? (
        <Text style={styles.empty}>
          No hot dogs logged yet.
        </Text>
      ) : (
        logEntries.map((entry, index) => {
          const product = hotdogs
            .flatMap((brand) => brand.products)
            .find(
              (product) => product.id === entry.productId
            );

          return (
            <View
              key={entry.id}
              style={styles.entry}
              >
              <Text style={styles.text}>
                {entry.quantity} × {product?.name}
              </Text>

              <Text style={styles.distance}>
                +{entry.inchesAdded} inches
              </Text>

              <Text style={styles.date}>
                {new Date(entry.date).toLocaleDateString()}
              </Text>

              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteLogEntry(entry.id)}
                >
                <Text style={styles.deleteText}>
                Delete
                </Text>
                </Pressable>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  empty: {
    fontSize: 18,
    textAlign: "center",
  },

  entry: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#F5A623",
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
  },

  distance: {
    fontSize: 16,
    marginTop: 5,
  },

  date: {
    fontSize: 14,
    marginTop: 5,
  },

  deleteButton: {
  marginTop: 10,
  padding: 8,
  borderRadius: 10,
},

  deleteText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
