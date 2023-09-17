import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import io from "socket.io-client";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const GroupChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const defaultDate = "2023-08-12 23:03:13";
  const currentDate = new Date();

  const { username } = route.params;
  const [userName, setUserName] = useState(username || "Student");

  useEffect(() => {
    const newSocket = io("http://192.168.31.170:5000");
    setSocket(newSocket);

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("previous_messages", (previousMessages) => {
      setMessages(previousMessages);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userName && socket) {
      socket.emit("login", userName);
    }
  }, [userName, socket]);

  // const checkForProfanity = async (message) => {
  //   try {
  //     const response = await fetch(
  //       `https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(
  //         message
  //       )}`
  //     );
  //     const data = await response.text();
  //     console.log(data);
  //     return data === "true";
  //   } catch (error) {
  //     console.error("Error checking profanity:", error);
  //     return false;
  //   }
  // };

  const checkForProfanity = async (message) => {
    try {
      const response = await axios.get(
        `https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(
          message
        )}`
      );
      const data = response.data;
      console.log(typeof(data));
      return data == false? true : false
      //https://www.purgomalum.com/index.html
      // api will return false if the message does not contain profanity and true if it does contain profanity 
    } catch (error) {
      console.error("Error checking profanity:", error);
      return false;
    }
  };
  const handleSendMessage = async() => {
    if (newMessage.trim() !== "") {
      if (await checkForProfanity(newMessage.trim())) {
      const message = { sender: userName, message: newMessage };
      socket.emit("message", message);
      setNewMessage("");
      }
      else{
        Alert.alert("Profanity Alert", "Please refrain from using profanity.");
        setNewMessage("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              {
                backgroundColor:
                  message.sender.toLowerCase() === userName.toLowerCase()
                    ? "blue"
                    : "purple",
                    alignSelf:
                    message.sender.toLowerCase() === userName.toLowerCase() ? "flex-end" : "flex-start",
              },
            ]}
          >
            <View style={styles.messageContent}>
              <Text style={styles.senderName}>
                {message.sender === undefined ||
                message.sender.trim() === "" ||
                message.sender === "undefined"
                  ? "teacher"
                  : message.sender.trim()}
              </Text>
              <Text style={styles.messageText}>
                {message.message === undefined ||
                message.message.trim() === "" ||
                message.message === "undefined"
                  ? "hi"
                  : message.message.trim()}
              </Text>
              <Text style={styles.messageDate}>
                {message.timestamp
                  ? (message.timestamp.slice(0, 10) === currentDate.toISOString().slice(0, 10) 
                  ? message.timestamp.slice(11, 16) // Display only time if the date is today
                  : message.timestamp.slice(0, 10))
                  : defaultDate.slice(0, 10).trim()}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <View style={styles.sendButton}>
            <Icon name="send-sharp" size={30} color="blue" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 5,
    width:200,
    padding: 10,
    borderRadius: 20,
  },
  messageContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  senderName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "white",
  },
  messageText: {
    marginTop: 4,
    fontSize: 14,
    color: "white",
  },
  messageDate: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,

    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    height: 40,
    width: 40,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});

export default GroupChatScreen;
