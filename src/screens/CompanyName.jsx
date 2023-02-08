import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const CompanyScreen = ({ navigation }) => {
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");

  return (
    <View style={styles.container}>
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
      <Button
        title="Siguiente"
        onPress={() => navigation.navigate("RoleWanted", { company, sector })}
        style={styles.nextButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "start",
    padding: 32,
    backgroundColor: "#fff",
    marginTop: 80,
  },
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

export default CompanyScreen;
