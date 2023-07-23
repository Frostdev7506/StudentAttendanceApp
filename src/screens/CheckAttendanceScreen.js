import React from "react";
import { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckAttendanceScreen = ({ route, navigation }) => {
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
      headerRight: () => <Button title="Logout" onPress={handleLogout} />,
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

export default CheckAttendanceScreen;
