import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function DailyStreak({ streak }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="fire" size={32} color="#ff6b6b" />
      <View style={styles.textContainer}>
        <Text style={styles.streakCount}>{streak} Day Streak!</Text>
        <Text style={styles.streakDesc}>Keep up the good work</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    marginLeft: 16,
  },
  streakCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  streakDesc: {
    fontSize: 14,
    fontWeight: 500,
    color: "#555",
  },
});
