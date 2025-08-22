import themes from "@/constants/themesNew";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ThemeCard({
  id,
  icon,
  label,
  active,
  locked = false,
  requiredStreak = 0,
  onThemeSelect,
}) {
  const currentTheme = themes.find((t) => t.id === id) || themes[0];

  const themeStyles = {
    cardActive: {
      borderColor: currentTheme.colors.primary,
      backgroundColor: currentTheme.colors.background,
    },
  };

  const handlePress = () => {
    if (!locked) {
      onThemeSelect(id);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        active ? themeStyles.cardActive : styles.cardInactive,
        locked && styles.cardLocked,
      ]}
      onPress={handlePress}
      disabled={locked}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.label, locked && styles.lockedText]}>{label}</Text>
      <Text style={styles.subLabel}>
        {locked
          ? `Unlock with ${requiredStreak} day streak`
          : active
          ? "Active Theme"
          : ""}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 2,
  },
  cardActive: {
    backgroundColor: "#f0f8ff", // light blue background
    borderColor: "#007aff", // blue border
  },
  cardInactive: {
    backgroundColor: "#f9f9f9",
    borderColor: "#eee",
  },
  cardLocked: {
    opacity: 0.6,
  },
  iconContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  lockedText: {
    color: "#999",
  },
  subLabel: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
  },
});
