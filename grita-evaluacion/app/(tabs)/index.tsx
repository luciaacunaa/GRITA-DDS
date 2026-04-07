import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [message, setMessage] = useState("...");
  const [volume, setVolume] = useState(-100);

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    start();
  }, []);

  // Animación cuando habla bajo
  useEffect(() => {
    if (volume < -40) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      opacity.stopAnimation();
      opacity.setValue(1);
    }
  }, [volume]);

  const start = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      (recording as any)._options.isMeteringEnabled = true;

      recording.setProgressUpdateInterval(100);

      recording.setOnRecordingStatusUpdate((status) => {
        if (status.metering !== undefined) {
          const vol = status.metering;

          setVolume(vol);
          update(vol); // ✅ SIN delay
        }
      });

      await recording.startAsync();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const update = (vol: number) => {
    if (vol < -70) {
      setMessage("...");
    } else if (vol < -60) {
      setMessage("No es nada");
    } else if (vol < -50) {
      setMessage("Estás exagerando");
    } else if (vol < -40) {
      setMessage("No te entiendo");
    } else if (vol < -30) {
      setMessage("Hablá más claro");
    } else {
      setMessage("¡¡ESCUCHAME!!");
    }
  };

  const getTextStyle = () => {
    if (volume < -70) return styles.low;
    if (volume < -60) return styles.mediumLow;
    if (volume < -50) return styles.medium;
    if (volume < -40) return styles.mediumHigh;
    if (volume < -30) return styles.high;
    return styles.scream;
  };

  const getBackground = () => {
    if (volume < -70) return "#050505";
    if (volume < -60) return "#0d0d0d";
    if (volume < -50) return "#1a1a1a";
    if (volume < -40) return "#330000";
    if (volume < -30) return "#660000";
    return "#8B0000";
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackground() }]}>
      <Animated.Text
        style={[styles.text, getTextStyle(), { opacity: opacity }]}
      >
        {message}
      </Animated.Text>

      <Text style={styles.debug}>Vol: {volume.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    textAlign: "center",
    color: "white",
    paddingHorizontal: 20,
  },

  low: {
    fontSize: 14,
    opacity: 0.2,
  },

  mediumLow: {
    fontSize: 18,
    opacity: 0.4,
  },

  medium: {
    fontSize: 24,
    opacity: 0.6,
  },

  mediumHigh: {
    fontSize: 30,
    color: "#ff9966",
  },

  high: {
    fontSize: 38,
    color: "orange",
  },

  scream: {
    fontSize: 56,
    color: "red",
    fontWeight: "bold",
  },

  debug: {
    marginTop: 30,
    fontSize: 12,
    color: "gray",
  },
});
