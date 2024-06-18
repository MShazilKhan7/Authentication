import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack, SplashScreen } from "expo-router";
import { AuthProvider } from "../components/context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
