// CheckAttendanceScreen.js
import React, { useState } from "react";
import { Alert, View, Text, StyleSheet, Button } from "react-native";
import StudentTable from "../components/StudentTable";

const CheckAttendanceScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [studentAttendanceData, setStudentAttendanceData] = useState([]);

  const CheckAttendance = async () => {
    try {
      const response = await fetch("http://192.168.31.170:5000/checkAttendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          username,
          apptype: "student", 
        }),
      });

      const data = await response.json();
      console.log("student data", data);
      setStudentAttendanceData(data);
      
      if (data.error) {
        Alert.alert("Error", data.error);
      } else {
        Alert.alert("Data found", `Found username ${data[0].student_id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.elements}>
        Hi {route.params.username}, Kindly check your Attendance!
      </Text>
      <Button title="Check Attendance" onPress={CheckAttendance} />
      {studentAttendanceData.length > 0 && (
        <StudentTable data={studentAttendanceData} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  elements: {
    padding: 10,
    margin: 10,
  },
});

export default CheckAttendanceScreen;
