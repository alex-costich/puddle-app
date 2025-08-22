import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import themes from "../../constants/themesNew";
import { useAppContext } from "../contexts/AppContext"; // Adjust the import path as needed
import ThemeCard from "./ThemeCard";

export default function ThemeSelector() {
  const { theme: activeTheme, setTheme, streak } = useAppContext();

  const handleThemeSelect = (themeId) => {
    setTheme(themeId);
  };

  return (
    <View style={styles.widget}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Themes</Text>
          <Text style={styles.description}>
            Unlock new themes by maintaining your streaks
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.themesContainer} horizontal>
        {themes.map((theme) => {
          // Check if the theme is locked based on user's streak
          const isLocked = theme.locked && streak < theme.required;

          return (
            <ThemeCard
              key={theme.id}
              id={theme.id}
              label={theme.name}
              icon={
                <MaterialCommunityIcons
                  name={theme.icon}
                  size={40}
                  color={
                    isLocked
                      ? "#999"
                      : theme.id === activeTheme
                      ? theme.colors.primary
                      : "#222"
                  }
                />
              }
              active={theme.id === activeTheme}
              locked={isLocked}
              requiredStreak={theme.required}
              onThemeSelect={handleThemeSelect}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  widget: {
    gap: 10,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
  },
  description: {
    fontWeight: "500",
    color: "rgb(71, 71, 71)",
  },
  themesContainer: {
    flexDirection: "row",
    gap: 6,
  },
});
