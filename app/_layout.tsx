import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack, SplashScreen, Redirect } from "expo-router";
import { AuthProvider } from "../components/context/AuthContext";
import { useAuth } from "../components/context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <Text>Root Layout.</Text>
      <Slot />
     
    </AuthProvider>
  );
}
