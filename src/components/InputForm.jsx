import React, { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import DisplayContainer from "../components/DisplayContainer";

const InputForm = ({ fields, onSubmit, questionText, requestText }) => {
  const [fieldValues, setFieldValues] = useState(() =>
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.label]: "",
      }),
      {}
    )
  );

  const inputs = fields.map((field) => {
    return (
      <TextInput
        key={field.label}
        style={styles.input}
        value={fieldValues[field.label]}
        placeholder={field.label}
        onChangeText={(text) =>
          setFieldValues((values) => ({
            ...values,
            [field.label]: text,
          }))
        }
      />
    );
  });

  return (
    <DisplayContainer>
      <Text style={styles.questionText}>{questionText}</Text>
      <Text style={styles.requestText}>{requestText}</Text>
      {inputs}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onSubmit(fields.map((field) => fieldValues[field.label]));
        }}
        disabled={fields.some((field) => !fieldValues[field.label])}
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
    cursor: "pointer",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});

export default InputForm;
