import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import BackButton from "../components/BackButton";
import getMatchedUserInfo from "../firebase/functions/getMatchedUserInfo";
import { UserLoginContex } from "../context/UserDataContext";
import { useRoute } from "@react-navigation/core";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { db } from "../firebase/credentials";

export default function MessageScreen() {
  const { userData } = useContext(UserLoginContex); //userData or user?
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const { matchDetails } = params;

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "Matches", matchDetails.id, "Messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  const sendMessage = () => {
    addDoc(collection(db, "Matches", matchDetails.id, "Messages"), {
      timestamp: serverTimestamp(),
      userId: userData.id,
      name: userData.name,
      image: matchDetails.users[userData.id].image,
      message: input,
    });

    setInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackButton
        text={getMatchedUserInfo(matchDetails.users, userData.id).name}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            styles={{ paddingLeft: 6 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              messages.userId === userData.id ? (
                <SenderMessage key={messages.id} message={message} />
              ) : (
                <ReceiverMessage key={messages.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Manda tu mensaje..."
            onChange={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Enviar" color="#841584" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 4,
  },
  input: {
    height: 40,
    fontSize: 20,
    margin: 12,
  },
});
