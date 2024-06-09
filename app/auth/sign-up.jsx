import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
const Login = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log("data:", data);
    const { email, username, password } = data;
    try {
      if (email && password && username) {
        console.log("yes...");
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup/", // Replace with your local IP address
          {
            email,
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Enter your username"
          />
        )}
      />
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
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
