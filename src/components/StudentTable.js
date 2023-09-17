// StudentTable.js
import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';

const StudentTable = ({ data }) => {
  console.log("StudentTabler",data);
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={[styles.container,{width:screenWidth,}]}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Sr.No</DataTable.Title>
          <DataTable.Title>Student ID</DataTable.Title>
          <DataTable.Title>Attendance</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {data.map((item,index) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{index + 1}</DataTable.Cell>
            <DataTable.Cell>{item.student_id}</DataTable.Cell>
            <DataTable.Cell>{item.present===1?"True":"False"}</DataTable.Cell>
            <DataTable.Cell>{item.date.slice(0,10)}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    
   

  },
});

export default StudentTable;
