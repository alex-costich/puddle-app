import { MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isSettingsPage = pathname === "/settings";

  return (
    <View style={styles.header}>
      {isSettingsPage ? (
        <TouchableOpacity onPress={() => router.push("/")}>
          <MaterialIcons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <MaterialIcons name="settings" size={32} color="black" />
        </TouchableOpacity>
      )}

      {!isSettingsPage && (
        <MaterialIcons name="person" size={32} color="gray" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white", // important so content doesn't show through
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 22,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
