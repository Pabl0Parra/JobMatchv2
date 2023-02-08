import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Validate fields
    // TODO: Validate valid email, validate password length, etc.
    // TODO: Show error messages
    // TODO: Show loading indicator
    // TODO: Perform Login

    if (!email) {
      alert("Email is required");
      return;
    }

    if (!password) {
      alert("Password is required");
      return;
    }

    // Perform Login
  };

  return (
    <View style={styles.container}>
      <Image
        // Aquí se añade el logo
        // source={require("./logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.h1}>Logo</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Inicia sesión</Text>
      </TouchableOpacity>
      <span>o</span>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Inicia sesión con Google</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        ¿Aún no tienes cuenta?{" "}
        <Text style={styles.loginLink}>Crear cuenta</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 32,
    backgroundColor: "#fff",
  },
  logo: {
    width: 128,
    height: 128,
    marginVertical: 32,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 82,
  },
  input: {
    width: "100%",
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 16,
    fontSize: 16,
  },
  loginLink: {
    color: "grey",
    fontWeight: "bold",
  },
});

export default Login;
