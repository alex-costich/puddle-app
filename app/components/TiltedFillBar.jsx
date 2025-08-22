import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Gyroscope } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import themes from "../../constants/themesNew";
import { useAppContext } from "../contexts/AppContext";

export default function TiltedFillBar({ currentIntake, dailyGoal }) {
  const { theme } = useAppContext();
  const height = 300;

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  const tiltAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // First fish animated values
  const fish1TranslateY = useRef(new Animated.Value(height / 2 - 24)).current;
  const fish1TranslateX = useRef(new Animated.Value(-150)).current;
  const fish1Opacity = useRef(new Animated.Value(0)).current;
  const fish1Scale = useRef(new Animated.Value(0.6)).current;

  // Second fish animated values
  const fish2TranslateY = useRef(new Animated.Value(height / 2 - 50)).current;
  const fish2TranslateX = useRef(new Animated.Value(-150)).current;
  const fish2Opacity = useRef(new Animated.Value(0)).current;
  const fish2Scale = useRef(new Animated.Value(0.4)).current;

  // Bobbing animations
  const fish1Bob = useRef(new Animated.Value(0)).current;
  const fish2Bob = useRef(new Animated.Value(0)).current;

  const percent = Math.min(currentIntake / dailyGoal, 1);

  const [fish1Shown, setFish1Shown] = useState(false);
  const [fish2Shown, setFish2Shown] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(true);

  // Gyroscope handler with reduced tilt sensitivity as fill increases
  useEffect(() => {
    Gyroscope.setUpdateInterval(100);

    const subscription = Gyroscope.addListener(({ y }) => {
      if (!tiltEnabled) return;

      const clamped = Math.max(-1, Math.min(1, -y));
      const tiltStrength = 1 - percent; // 0 when full, 1 when empty
      const tiltDegrees = clamped * 45 * tiltStrength;

      Animated.spring(tiltAnim, {
        toValue: tiltDegrees,
        useNativeDriver: true,
        friction: 6,
        tension: 50,
      }).start();
    });

    return () => subscription.remove();
  }, [tiltEnabled, percent]);

  // Fill bar and fish animation
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: (1 - percent) * height,
      duration: 600,
      useNativeDriver: true,
    }).start();

    if (percent === 1) {
      setTiltEnabled(false);
    } else if (!tiltEnabled) {
      setTiltEnabled(true);
    }

    if (percent === 1 && !fish1Shown) {
      setFish1Shown(true);

      fish1TranslateY.setValue(height / 2 - 24);
      fish1TranslateX.setValue(-150);
      fish1Opacity.setValue(0);
      fish1Scale.setValue(0.6);

      Animated.parallel([
        Animated.timing(fish1TranslateY, {
          toValue: height / 2 - 24,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fish1TranslateX, {
          toValue: 110,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fish1Opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(fish1Scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(fish1Bob, {
              toValue: -8,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(fish1Bob, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });

      setTimeout(() => {
        setFish2Shown(true);

        fish2TranslateY.setValue(height / 2 - 50);
        fish2TranslateX.setValue(-150);
        fish2Opacity.setValue(0);
        fish2Scale.setValue(0.4);

        Animated.parallel([
          Animated.timing(fish2TranslateY, {
            toValue: height / 2 - 50,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(fish2TranslateX, {
            toValue: 180,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(fish2Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(fish2Scale, {
            toValue: 0.7,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setTimeout(() => {
            Animated.loop(
              Animated.sequence([
                Animated.timing(fish2Bob, {
                  toValue: -6,
                  duration: 1800,
                  useNativeDriver: true,
                }),
                Animated.timing(fish2Bob, {
                  toValue: 0,
                  duration: 1800,
                  useNativeDriver: true,
                }),
              ])
            ).start();
          }, 1000);
        });
      }, 300);
    }
  }, [percent]);

  const rotateZ = tiltAnim.interpolate({
    inputRange: [-45, 45],
    outputRange: ["-45deg", "45deg"],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View
        style={[
          styles.surface,
          {
            backgroundColor: currentTheme.colors.primary,
            transform: [{ translateY }, { rotateZ }],
          },
        ]}
      />
      {fish2Shown && (
        <Animated.View
          style={[
            styles.fish,
            {
              opacity: fish2Opacity,
              transform: [
                { translateY: Animated.add(fish2TranslateY, fish2Bob) },
                { translateX: fish2TranslateX },
                { scale: fish2Scale },
              ],
            },
          ]}
        >
          <MaterialCommunityIcons
            name="fish"
            size={60}
            color={"rgb(255,255,255)"}
          />
        </Animated.View>
      )}
      {fish1Shown && (
        <Animated.View
          style={[
            styles.fish,
            {
              opacity: fish1Opacity,
              transform: [
                { translateY: Animated.add(fish1TranslateY, fish1Bob) },
                { translateX: fish1TranslateX },
                { scale: fish1Scale },
              ],
            },
          ]}
        >
          <MaterialCommunityIcons
            name="fish"
            size={90}
            color={"rgb(255,255,255)"}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
  },
  surface: {
    width: "500%",
    height: "500%",
    position: "absolute",
  },
  fish: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
});
