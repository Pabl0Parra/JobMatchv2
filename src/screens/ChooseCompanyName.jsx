import React, { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import DisplayContainer from "../components/DisplayContainer";

const ChooseCompanyName = ({ navigation }) => {
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");

  return (
    <DisplayContainer>
      <Text style={styles.questionText}>¿Cómo se llama la empresa?</Text>
      <Text style={styles.requestText}>Introduce los siguientes datos:</Text>
      <TextInput
        style={styles.input}
        value={company}
        placeholder="Nombre de la empresa"
        onChangeText={(text) => setCompany(text)}
      />
      <TextInput
        style={styles.input}
        value={sector}
        placeholder="Sector de la empresa"
        onChangeText={(text) => setSector(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("RoleWanted", { company, sector });
        }}
        disabled={!company || !sector}
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
  nextButton: {
    marginTop: 80,
    width: "100%",
    borderRadius: 200,
  },
});

export default ChooseCompanyName;
