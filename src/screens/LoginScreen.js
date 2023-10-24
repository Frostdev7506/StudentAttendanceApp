import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocusPass = () => setIsFocusedPass(true);
  const handleBlurPass = () => setIsFocusedPass(false);

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
    setIsLoading(true);
    try {
      setIsLoading(true); // Start loading
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
        Alert.alert(
          "Invalid Credentials",
          "Check Your credentials: \n \n 1)username \n \n 2)password \n "
        );
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false); // Stop loading
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.heading_text}>{"Student Login"}</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isFocused ? "gray" : "black" },
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Username..."
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={[
              styles.input,
              { borderColor: isFocusedPass ? "gray" : "black" },
            ]}
            onFocus={handleFocusPass}
            onBlur={handleBlurPass}
            placeholder="Password...."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.text}>{"Login"}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1eff5",
  },
  input: {
    width: "80%",
    height: 60,
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    width: 120,
    height: 60,
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#4CAF50", // Add this if you want a background color
    alignItems: "center", // Center the text horizontally
    justifyContent: "center", // Center the text vertically
  },
  text: {
    color: "white", // Change this to change the text color
    fontSize: 16, // Change this to change the text size
  },
  heading_text: {
    color: "white", // Change this to change the text color
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
  },
});

export default LoginScreen;
