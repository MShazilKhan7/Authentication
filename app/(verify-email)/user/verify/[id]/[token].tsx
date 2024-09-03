import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../../components/context/AuthContext";
import { useLocalSearchParams } from "expo-router";
const VerifyEmail = () => {
  const local = useLocalSearchParams();
  const [message, setMessage] = useState("Loading...");
  console.log(local.id, local.token);
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/auth/user/verify/${local.id}/${local.token}`
        );
        if (response.status === 200) {
          setMessage("Email Successfully verified");
        }
        console.log("Response: ", response);
      } catch (error) {
        console.error("Error verifying email: ", error);
      }
    };

    verifyEmail();
  }, [local.id, local.token]);
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Welcome to Your App</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    backgroundColor: "black",
  },
  text: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
});
