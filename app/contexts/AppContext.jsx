import * as Notifications from "expo-notifications";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { registerForPushNotificationsAsync } from "../../functions/registerForPushNotifications";
import { useESPWeight } from "../../hooks/useESPWeight";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [theme, setTheme] = useState("ocean");
  const [streak, setStreak] = useState(90);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);

  // Destructure tare and tareValue along with espWeight, error, intake
  const { espWeight, error, intake, tare, tareValue } = useESPWeight(1000);

  const hasNotified = useRef(false);

  // Update intake if new valid data comes in
  useEffect(() => {
    setCurrentIntake(intake);
  }, [intake]);

  // Notify when hydration goal is reached
  useEffect(() => {
    if (currentIntake >= dailyGoal && !hasNotified.current) {
      hasNotified.current = true;

      Notifications.scheduleNotificationAsync({
        content: {
          title: "🎉 Goal Met!",
          body: "You’ve met your hydration goal for today!",
          sound: "default",
        },
        trigger: null,
      });
    }

    if (currentIntake < dailyGoal) {
      hasNotified.current = false;
    }
  }, [currentIntake, dailyGoal]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        streak,
        setStreak,
        currentIntake,
        setCurrentIntake,
        dailyGoal,
        setDailyGoal,
        espWeight,
        espError: error,
        tare, // <-- Expose tare function here
        tareValue, // <-- Expose tareValue here
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
