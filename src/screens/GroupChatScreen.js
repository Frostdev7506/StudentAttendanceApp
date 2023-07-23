import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import io from "socket.io-client";

const GroupChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const { username } = route.params;
  const [userName, setuserName] = useState(username || "Student");

  useEffect(() => {
    // Connect to the WebSocket server when the component mounts
    const newSocket = io("http://192.168.31.170:5000"); // Replace with your WebSocket server URL
    setSocket(newSocket);

    // Listener for incoming messages from the WebSocket server
    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listener for previous messages from the WebSocket server
    newSocket.on("previous_messages", (previousMessages) => {
      setMessages(previousMessages);
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Check if the userName is set and the socket connection is established
    if (userName && socket) {
      // Send the userName to the server upon connection
      socket.emit("login", userName);
    }
  }, [userName, socket]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Send the message to the WebSocket server with the username
      const message = { sender: userName, message: newMessage };
      socket.emit("message", message);
      setNewMessage("");
    }
  };

  return (
    <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, margin: 5, padding: 5 }}>
          Hi, {userName}
        </Text>
      </View>
      <ScrollView>
        {messages.map((message, index) => (
          <View
            key={index}
            style={{
              backgroundColor: message.sender === userName ? "blue" : "purple",
              borderRadius: 40,
              margin: 10,
              height: 60,
              width: 200,
              display: "flex",
              //   justifyContent:
              //     message.sender === userName ? "flex-end" : "flex-start",

              alignSelf:
                message.sender === userName ? "flex-end" : "flex-start",

              borderRadius: 20,
              borderWidth: 2,
              marginBottom: 20,
              padding: 10,
            }}
          >
            <Text
              style={{
                padding: 5,
                margin: 2,
                // alignSelf:
                //   message.sender == userName ? "flex-end" : "flex-start",
              }}
            >
              {message.sender}: {message.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TextInput
          style={{
            width: "80%",
            height: 60,
            margin: 5,

            borderRadius: 20,
            borderWidth: 2,
            marginBottom: 20,
            padding: 10,
          }}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        {/* <Button
          style={{
            borderRadius: 20,
            backgroundColor: "blue",
          }}
          title="Send"
          onPress={handleSendMessage}
        /> */}

        <TouchableOpacity onPress={handleSendMessage}>
          <View
            style={{
              backgroundColor: "blue",
              borderRadius: 60,
              height: 50,

              marginTop: 12,
              marginHorizontal: 5,
              padding: 10,
            }}
          >
            <Text style={{ color: "white", padding: 5 }}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupChatScreen;
