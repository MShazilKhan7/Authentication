import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
const App = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/auth/login");
        }}
      >
        Login
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/auth/sign-up");
        }}
      >
        sign up
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
