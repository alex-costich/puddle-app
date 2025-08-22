import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import Header from "./components/Header";
import AppContextProvider from "./contexts/AppContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  return (
    <AppContextProvider>
      <Stack
        screenOptions={{
          header: () => <Header />,
        }}
      />
    </AppContextProvider>
  );
}
