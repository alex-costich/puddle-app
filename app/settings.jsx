import Slider from "@react-native-community/slider";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import themes from "../constants/themesNew";
import { useAppContext } from "./contexts/AppContext";

export default function Settings() {
  const {
    theme: activeThemeId,
    dailyGoal,
    setDailyGoal,
    tare,
    espWeight,
    tareValue,
  } = useAppContext();

  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0];

  const themeStyles = {
    container: {
      backgroundColor: activeTheme.colors.background,
    },
    sliderValue: {
      color: activeTheme.colors.primary,
    },
  };

  const handleTarePress = async () => {
    try {
      const res = await fetch("http://192.168.4.1/");
      const text = await res.text();
      const weight = parseFloat(text);
      if (!isNaN(weight)) {
        tare(weight); // Pass raw weight + offset inside tare function in hook
      } else {
        alert("Invalid weight from sensor, cannot tare.");
      }
    } catch (error) {
      alert("Failed to reach sensor: " + error.message);
    }
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.sliderContainer}>
        <View style={styles.textRow}>
          <Text style={[styles.title, themeStyles.title]}>Daily goal</Text>
          <Text style={[styles.sliderValue, themeStyles.sliderValue]}>
            {dailyGoal} mL
          </Text>
        </View>
        <Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={5000}
          step={50}
          value={dailyGoal}
          onValueChange={setDailyGoal}
          minimumTrackTintColor={activeTheme.colors.primary}
          maximumTrackTintColor={activeTheme.colors.border || "#ccc"}
        />
        <TouchableOpacity
          onPress={handleTarePress}
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 12,
            backgroundColor: activeTheme.colors.primary,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Tare Scale</Text>
        </TouchableOpacity>

        {/* Sensor Info */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
            Sensor Info
          </Text>
          <Text style={{ fontSize: 14 }}>
            Current Weight:{" "}
            <Text style={{ fontWeight: "500" }}>
              {espWeight != null ? espWeight.toFixed(1) + " g" : "Loading..."}
            </Text>
          </Text>
          <Text style={{ fontSize: 14 }}>
            Tare Value:{" "}
            <Text style={{ fontWeight: "500" }}>
              {tareValue != null ? tareValue.toFixed(1) + " g" : "Not set"}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sliderContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: "500",
  },
});
