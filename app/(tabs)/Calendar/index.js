import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import {Feather, MaterialIcons, Octicons} from "@expo/vector-icons";
import axios, { all } from 'axios';

const index = () => {
  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);
  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/todos/completed/${selectedDate}`)
      const completedTodos = response.data.completedTodos || [];
      setTodos(completedTodos);
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    fetchCompletedTodos();
  }, [selectedDate]); // function fetchCompletedTodos will run when selected changes

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString)
  }

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7CB9E8" }
        }}
      />
      <View style={{ marginTop: 20 }} />
     
      {todos?.length > 0 && (
        <View style={{flex:1}}> 
          <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png" }}
            />
          </View>

          <View style={styles.todoContainter}>
            <Text>Completed tasks</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </View>

          {/* bug: scrollview doesn't seem to work. how to keep the above section fixed? and only the following section scrollable? */}
          <ScrollView>
          {todos?.map((item, index) => (
            <TouchableOpacity key={index} style={styles.todoTouchable}>
              <View style={styles.todoContainter}>
                <Octicons name="check-circle-fill" size={18} color="gray" />
                <Text style={{ flex: 1, textDecorationLine: 'line-through', color: 'gray' }}>{item.title}</Text>
                <Feather name="flag" size={20} color="gray" />
              </View>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  todoContainter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 10,
  },
  todoTouchable: {
    backgroundColor: '#E0E0E0',
    margin: 10,
    borderRadius: 5
  }
})