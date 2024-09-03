import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const App = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/auth/login");
        }}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/auth/sign-up");
        }}
      >
        <Text style={styles.text}>sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "pink",
  },
  logoutButton: {
    padding: 10,
    borderRadius: 20, 
  },
  text: {
    fontSize: 28,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 60,
    textAlign: "center",
    fontWeight: "bold",
  },
});
