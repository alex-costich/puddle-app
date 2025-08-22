import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import themes from "../../constants/themesNew"; // Update this import path as needed
import { useAppContext } from "../contexts/AppContext"; // Update this import path as needed

export default function WaterProgress({ currentIntake, dailyGoal }) {
  const { theme } = useAppContext();

  // Find the current theme object
  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  const progress = (currentIntake / dailyGoal) * 100;

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 16,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    progressInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    textContainer: {
      marginLeft: 16,
    },
    amount: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
    },
    goal: {
      fontSize: 14,
      color: "#666",
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: "#e0e0e0",
      borderRadius: 4,
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      backgroundColor: currentTheme.colors.primary,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.progressInfo}>
        <MaterialCommunityIcons
          name="water"
          size={40}
          color={currentTheme.colors.primary}
        />
        <View style={dynamicStyles.textContainer}>
          <Text style={dynamicStyles.amount}>{currentIntake}ml</Text>
          <Text style={dynamicStyles.goal}>of {dailyGoal}ml daily goal</Text>
        </View>
      </View>
      <View style={dynamicStyles.progressBarContainer}>
        <View
          style={[
            dynamicStyles.progressBar,
            { width: `${Math.min(progress, 100)}%` },
          ]}
        />
      </View>
    </View>
  );
}
