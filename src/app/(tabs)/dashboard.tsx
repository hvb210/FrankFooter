import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ScrollView,
  Image} from "react-native";
import { useApp } from "@/context/AppContext";
import { useRouter } from "expo-router";
import { landmarks } from "@/data/landmarks";
import { achievements } from "@/data/achievements";

export default function DashboardScreen() {
  const router = useRouter();

  const { totalInches, goalInches, resetAppData } = useApp();

  const safeTotalInches = Math.max(0, totalInches);

  const feet = Math.floor(safeTotalInches / 12);
  const remainingInches = (safeTotalInches % 12).toFixed(1);

  const progress = Math.min(
  safeTotalInches / goalInches,
  1
  );

  const progressPercent = (progress * 100).toFixed(2);

  const landmarksCompleted = landmarks.filter(
  (landmark) => landmark.feet * 12 <= totalInches
).length;

const badges = achievements.map((achievement) => ({
  ...achievement,
  unlocked: landmarksCompleted >= achievement.threshold,
}));

  const nextLandmark = landmarks.find(
    (landmark) => landmark.feet * 12 > safeTotalInches
  );

  const landmarkRemainingInches = nextLandmark
    ? nextLandmark.feet * 12 - safeTotalInches
    : 0;

  const landmarkRemainingFeet = Math.floor(
    landmarkRemainingInches / 12
  );

  const landmarkRemainingExtraInches = Math.round(
    landmarkRemainingInches % 12
  );

  const handleReset = () => {
  Alert.alert(
    "Reset App Data?",
    "This will erase your goal, hot dog logs, and progress. You will start over as a new user.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reset",
        style: "destructive",
        onPress: resetAppData,
      },
    ]
  );
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        The Long Dog
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
        Next Bite
      </Text>

      <Text style={styles.value}>
        {nextLandmark
          ? `${nextLandmark.name}: (${landmarkRemainingFeet} feet ${landmarkRemainingExtraInches} inches to go)`
          : "You've eaten a mile of hot dogs!"}
      </Text>

      <Text style={styles.label}>
        Achievements
      </Text>

      <View style={styles.badgeRow}>
        {badges.map((badge) => (
          <AchievementBadge
          key={badge.id}
          name={badge.name}
          description={badge.description}
          icon={badge.icon}
          unlocked={badge.unlocked}
          />
        ))}
      </View>

      <Pressable
          style={styles.resetButton}
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>
            Reset App Data
          </Text>
      </Pressable>
    </ScrollView>
  );
}

function AchievementBadge({
  name,
  description,
  icon,
  unlocked,
}: {
  name: string;
  description: string;
  icon: any;
  unlocked: boolean;
}) {
  return (
    <View
      style={[
        styles.badge,
        !unlocked && styles.lockedBadge,
      ]}
    >
      <Image
        source={icon}
        style={styles.badgeIcon}
        />

      <Text style={styles.badgeName}>
        {name}
      </Text>

      <Text style={styles.badgeDescription}>
        {description}
      </Text>

      <Text style={styles.badgeStatus}>
        {unlocked ? "✅" : "🔒"}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
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

  badgeRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: 10,
},

  badge: {
    alignItems: "center",
    width: 90,
    margin: 8,
  },

  lockedBadge: {
    opacity: 0.35,
  },

  badgeIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  badgeName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },

  badgeDescription: {
    fontSize: 10,
    textAlign: "center",
  },

  resetButton: {
    marginTop: 40,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
  },

  resetButtonText: {
    color: "red",
    fontWeight: "bold",
  },
});
