import React, { useState } from "react";
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DisplayContainer from "../components/DisplayContainer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Validate fields
    // TODO: Validate valid email, validate password length, etc.
    // TODO: Show error messages
    // TODO: Show loading indicator
    // TODO: Perform register

    if (!email) {
      alert("Email is required");
      return;
    }

    if (!password) {
      alert("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Perform Register
  };

  return (
    <DisplayContainer>
      <Image
        source={{
          uri: `https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg`,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.textDescription}>
        Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, est a, mattis tellus.
      </Text>
      <Text style={styles.text}>Crea tu cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirma contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.text}>Crea tu cuenta</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        ¿Aún no tienes una cuenta?
        <Text
          style={{ ...styles.text, ...styles.textButton }}
          onPress={() => navigation.navigate("Login")}
        >
          Crear cuenta
        </Text>
      </Text>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 79,
    height: 79,
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "semibold",
  },
  textDescription: {
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 18,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    margin: 10,
    padding: 10,
  },
  button: {
    justifyContent: "center",
    width: 288,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
  },
  textButton: {
    color: "#0000ff",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Register;
