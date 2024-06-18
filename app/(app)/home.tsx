import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../components/context/AuthContext";
const Home = () => {
  const { onLogout } = useAuth();
  return (
    <View>
      <Text>Application Home</Text>
      <TouchableOpacity onPress={onLogout}>logout</TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
