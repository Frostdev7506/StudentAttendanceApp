import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [savedUsername, setSavedUsername] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      // Get the token and username from async storage
      const token = await AsyncStorage.getItem("token");
      const savedUsername = await AsyncStorage.getItem("username");

      // Check if there's a valid token and username
      if (token && savedUsername) {
        // Navigate to the Home screen
        navigation.replace("HomeTabs", { username: savedUsername });
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.31.170:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify({
          username,
          password,
          apptype: "student", // Send the apptype as "student" in the request body
        }),
      });

      const data = await response.json();

      // Check if login was successful
      if (data.token) {
        // Save the token to async storage for future requests
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("username", username);

        console.log(username);

        // Navigate to the Home screen after successful login
        navigation.replace("HomeTabs", { username });
      } else {
        // Handle invalid credentials or other login errors
        setLoginState(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username..."
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password...."
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        style={{
          width: "120",
          height: 60,
          borderWidth: 2,
          marginBottom: 20,
          padding: 10,
        }}
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 60,
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
  },
});

export default LoginScreen;
