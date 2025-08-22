import { ScrollView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import themes from "../constants/themesNew"; // Import themes
import DailyStreak from "./components/DailyStreak";
import ThemeSelector from "./components/ThemeSelector";
import TiltedFillBar from "./components/TiltedFillBar";
import WaterProgress from "./components/WaterProgress";
import WeeklyProgressChart from "./components/WeekyProgressChart";
import { useAppContext } from "./contexts/AppContext";

export default function Index() {
  const {
    streak,
    currentIntake,
    dailyGoal,
    theme: activeThemeId,
  } = useAppContext();

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [1500, 1800, 2000, 1600, 1900, 1200, 1700],
      },
    ],
  };

  // Find the active theme object from themes array
  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0];

  // Create dynamic styles using the active theme colors
  const themeStyles = {
    container: {
      backgroundColor: activeTheme.colors.background,
    },
    title: {
      color: activeTheme.colors.primary,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={themeStyles.container}>
        <View style={[styles.statsContainer]}>
          <TiltedFillBar currentIntake={currentIntake} dailyGoal={dailyGoal} />
        </View>
        {/* Home screen content */}
        <View style={[styles.content]}>
          {/* Themes */}
          <WaterProgress currentIntake={currentIntake} dailyGoal={dailyGoal} />
          <ThemeSelector />
          <DailyStreak streak={streak} />
          <WeeklyProgressChart data={weeklyData} />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 15,
    gap: 10,
  },
  statsContainer: {
    marginTop: 15,
    justifyContent: "flex-end", // aligns children to bottom vertically
    paddingHorizontal: 20,
  },
});
