import React, { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import DisplayContainer from "../components/DisplayContainer";

const ChooseUserName = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  return (
    <DisplayContainer>
      <Text style={styles.questionText}>¿Cómo te llamas?</Text>
      <Text style={styles.requestText}>Introduce los siguientes datos:</Text>
      <TextInput
        style={styles.input}
        value={userName}
        placeholder="Nombre de usuario"
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        value={userLastName}
        placeholder="Apellido de usuario"
        onChangeText={(text) => setUserLastName(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ChooseUserType", { userName, userLastName });
        }}
        disabled={!userName || !userLastName}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  questionText: {
    fontSize: 22,
    marginBottom: 10,
  },
  requestText: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    justifyContent: "center",
    width: 288,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    marginTop: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});

export default ChooseUserName;
