import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import themes from "../../constants/themesNew";
import { useAppContext } from "../contexts/AppContext";

export default function WeeklyProgressChart({ data }) {
  const { theme: activeThemeId } = useAppContext();

  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0];
  const { primary } = activeTheme.colors;

  return (
    <View style={[styles.chartContainer, { backgroundColor: "#ffffff" }]}>
      <Text style={[styles.chartTitle]}>Weekly progress</Text>
      <Text style={[styles.subLabel]}>
        Track your liquid intake over the week
      </Text>
      <LineChart
        data={data}
        width={315}
        height={200}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) =>
            primary.replace("rgb", "rgba").replace(")", `, ${opacity})`),
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff", // fallback, redundant because we override in inline style
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  chart: {
    borderRadius: 16,
  },
  subLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#555",
    marginBottom: 24,
  },
});
