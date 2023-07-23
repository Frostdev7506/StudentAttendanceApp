import React from "react";
import { useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ route, navigation }) => {
  // Get the passed username value from route.params
  const { username } = route.params;

  console.log(route.params);

  const handleLogout = async () => {
    // Clear the token and username from async storage
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("username");

    // Navigate back to the Login screen
    navigation.replace("Login");
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={{
              backgroundColor: "blue",
              borderRadius: 60,
              height: 50,
              width: 100,
              marginHorizontal: 5,
              padding: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 5,
                marginTop: 5,
                marginHorizontal: 15,
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>
        Hi {route.params.username}, Welcome to Student Attendance App!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
