import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import GroupChatScreen from "./GroupChatScreen";
import CheckAttendanceScreen from "./CheckAttendanceScreen";
import Ionicons from "react-native-vector-icons/Ionicons"; // import the icons library

const Tab = createBottomTabNavigator();

const HomeTabs = ({ route }) => {
  console.log(route.params);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarVisible: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={route.params}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GroupChat"
        component={GroupChatScreen}
        initialParams={route.params}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CheckAttendance"
        component={CheckAttendanceScreen}
        initialParams={route.params}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "checkmark-circle" : "checkmark-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
