import { Pressable, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Feather, MaterialIcons, Octicons, FontAwesome, Entypo } from "@expo/vector-icons";
import Fallback from "../../components/Fallback";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import axios from "axios";
import moment from "moment";


const index = () => {
  const today = moment().format("MMM Do YY")
  const [todos, setTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const [isModalVisible, setIsModalvisible] = useState(false);
  // when category button is selected, change color to indicate the currently selected button
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go Excercising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    {
      id: "4",
      todo: "Go Shopping",
    },
    {
      id: "5",
      todo: "finish assignments",
    },
  ];

  // send todo to backend
  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category
      }

      // hardcode the userId
      axios.post("http://localhost:3000/todos/66323afa15787621bd175154", todoData)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => { console.log(e) });

      await getUserTodos();  
      setIsModalvisible(false);
      setTodo("");
    } catch (error) {
      console.log("Error", error)
    }
  }

  // fetch todo from backend 
  useEffect(() => {
    getUserTodos();
  }, [marked, isModalVisible]);

  const getUserTodos = async () => {
    if (marked == true) {
      setMarked(false)
      return;
    }
    try {
      const response = await axios.get("http://localhost:3000/users/66323afa15787621bd175154/todos")
  
      // categorise todos into 2 categories: pending and complete
      const fetchedTodos = response.data.todos || [];
      setTodos(fetchedTodos);

      const pending = fetchedTodos.filter((todo) => todo.status === "pending");
      const completed = fetchedTodos.filter((todo) => todo.status === "completed");
      setPendingTodos(pending);
      setcompletedTodos(completed);
      setMarked(false)
    } catch (error) {
      console.log("Error", error)
    }
  }

  // mark todo as completed
  const markTodoAsCompleted = async (todoId) => {
    try {
      setMarked(true);
      const response = await axios.patch(`http://localhost:3000/todos/${todoId}/completed`)
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.button}>
          <Text style={styles.text}>All</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.text}>Work</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.text}>Personal</Text>
        </Pressable>

        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <AntDesign
            onPress={() => setIsModalvisible(!isModalVisible)}
            name="pluscircle"
            size={30}
            color="#007fff"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View>
          {todos?.length ?
            (<View>
              {pendingTodos?.length > 0 && <Text>Tasks need to be done today - {today}</Text>}

              {pendingTodos?.map((item, index) => (
                <TouchableOpacity key={index} style={styles.todoTouchable}>
                  <View style={styles.todoContainter}>
                    <Entypo
                      onPress={() => markTodoAsCompleted(item._id)}
                      name="circle"
                      size={18}
                      color="black"
                    />
                    <Text style={{ flex: 1 }}>{item.title}</Text>
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </TouchableOpacity>
              ))}

              {completedTodos?.length > 0 && (
                <View>
                  <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{ uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png" }}
                    />
                  </View>

                  <View style={styles.todoContainter}>
                    <Text>Completed tasks</Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                  </View>

                  {completedTodos?.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.todoTouchable}>
                      <View style={styles.todoContainter}>
                      <Octicons name="check-circle-fill" size={18} color="gray" />
                        <Text style={{ flex: 1, textDecorationLine: 'line-through', color: 'gray' }}>{item.title}</Text>
                        <Feather name="flag" size={20} color="gray" />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>)
            : (<Fallback />)}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => {
          setIsModalvisible(!isModalVisible);
        }}
        onHardwareBackPress={() => {
          setIsModalvisible(!isModalVisible);
        }}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setIsModalvisible(!isModalVisible)}
      >
        <ModalContent style={styles.modalContent}>
          <View style={styles.modalContentContainer}>
            {/* add new task */}
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new task here"
              style={styles.textInput}
            />
            <FontAwesome onPress={addTodo} name="send" size={24} color="#007fff" />
          </View>
          {/* choose category */}
          <Text style={{ marginTop: 15 }}>Choose Category</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setCategory("Work")}
            >
              <Text>Work</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setCategory("Personal")}
            >
              <Text>Personal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setCategory("Wishlist")}
            >
              <Text>Wishlist</Text>
            </TouchableOpacity>
          </View>

          {/* suggestions */}
          <Text style={{ marginTop: 15 }}>Some Suggestions</Text>
          <View style={styles.suggestionButtonContainer}>
            {suggestions?.map((item, index) => {
              return <TouchableOpacity
                style={styles.suggestionButton}
                key={index}
                onPress={() => setTodo(item.todo)}
              >
                <Text>{item?.todo}</Text>
              </TouchableOpacity>
            })}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  button: {
    backgroundColor: "#7CB9E8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  modalContent: {
    width: "100%",
    height: 290
  },
  textInput: {
    padding: 10,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 5,
    flex: 1
  },
  modalContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10
  },
  modalButton: {
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 25
  },
  modalButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10
  },
  suggestionButton: {
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
  },
  suggestionButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10
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
});
