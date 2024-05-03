import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PieChart } from 'react-native-chart-kit';

const index = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const fetchTaskData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos/count")
      const { totalCompletedTodos, totalPendingTodos } = response.data;
      setCompletedTasks(totalCompletedTodos);
      setPendingTasks(totalPendingTodos);
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(<function>, <optional: dependency>)
  useEffect(() => {
    fetchTaskData()
  }, [])

  // pie chart
  const data = [
    { name: 'Completed', number: completedTasks, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Pending', number: pendingTasks, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ]

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  }

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Profile bar */}
      <View style={styles.profileContainer}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={require('../../../assets/github-copilot.png')}
        />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Keep plans for 15 days</Text>
          <Text style={{ fontSize: 15, color: 'gray', marginTop: 4 }}>Select categories</Text>
        </View>
      </View>
      {/* todo data */}
      <View style={styles.bodyContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Task overview</Text>
        <View style={styles.taskDataContainer}>
          <View style={styles.taskDataSmallerContainer}>
            <Text style={styles.numberText}>{completedTasks}</Text>
            <Text>Completed tasks</Text>
          </View>
          <View style={styles.taskDataSmallerContainer}>
            <Text style={styles.numberText}>{pendingTasks}</Text>
            <Text>Pending tasks</Text>
          </View>
        </View>
      </View>

      {/* graph */}
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="number"
        backgroundColor="transparent"
        padding="15"
        absolute
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white'
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  bodyContainer: {
    alignItems: 'center',
    gap: 10,
    marginVertical: 20
  },
  taskDataContainer: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  taskDataSmallerContainer: {
    width: '40%',
    height: 80,
    backgroundColor: '#7CB9E8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white'
  }
})