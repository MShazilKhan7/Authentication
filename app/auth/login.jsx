import React, { useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { AuthProvider, useAuth } from "../../components/context/AuthContext";
import { Redirect, router } from "expo-router";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const { onRegister, onLogin, authState } = useAuth();

  useEffect(() => {
    console.log("login useEffect....");
    if (authState.authenticated) {
      router.replace("/home"); // replacing the current route with home..
    }
  }, [authState.authenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Enter your email"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Enter your password"
          />
        )}
      />
      <Button title="Submit" onPress={handleSubmit(onLogin)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    width: "70%",
  },
});
export default Login;
