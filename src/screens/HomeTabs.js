import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import GroupChatScreen from "./GroupChatScreen";
import CheckAttendanceScreen from "./CheckAttendanceScreen";

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
      />
      <Tab.Screen
        name="GroupChat"
        component={GroupChatScreen}
        initialParams={route.params}
      />
      <Tab.Screen name="CheckAttendance" component={CheckAttendanceScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
