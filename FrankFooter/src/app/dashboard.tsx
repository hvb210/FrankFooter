import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        FrankFooter
      </Text>

      <Text style={styles.label}>
        Your Goal
      </Text>

      <Text style={styles.value}>
        1 Mile of Hot Dogs
      </Text>

      <Text style={styles.label}>
        Current Distance
      </Text>

      <Text style={styles.value}>
        0 feet
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

const router = useRouter();

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

});
