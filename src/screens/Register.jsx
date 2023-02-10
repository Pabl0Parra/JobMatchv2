import React from "react";
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import DisplayContainer from "../components/DisplayContainer";
import registerUser from "../firebase/functions/registerUser";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordLength = 6;

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Este campo es requerido")
      .matches(emailRegex, "Formato de correo inválido"),
    password: yup
      .string()
      .required("Este campo es requerido")
      .min(
        passwordLength,
        `Contraseña debe tener al menos ${passwordLength} caracteres`
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Contraseña no coincide")
      .required("Este campo es requerido"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={({ email, password }) => {
        registerUser(email, password);
        navigation.navigate("ChooseUserType");
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <DisplayContainer>
          <Image
            style={styles.image}
            source={{
              uri: `https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg`,
            }}
          />
          <Text style={styles.textDescription}>Crea tu cuenta</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            onChangeText={handleChange("email")}
            value={values.email}
          />
          {errors.email && touched.email ? (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          ) : null}
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={handleChange("password")}
            value={values.password}
          />
          {errors.password && touched.password ? (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          ) : null}
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Confirma la contraseña"
            onChangeText={handleChange("confirmPassword")}
            value={values.confirmPassword}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            ¿Tienes cuenta?
            <Text
              style={{ ...styles.text, ...styles.textButton }}
              onPress={() => navigation.navigate("Login")}
            >
              Entra aquí
            </Text>
          </Text>
        </DisplayContainer>
      )}
    </Formik>
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
    fontFamily: "Roboto",
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
    // margin: 10,
    padding: 10,
  },
  button: {
    justifyContent: "center",
    width: 288,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    alignItems: "center",
  },
  textButton: {
    color: "#0000ff",
    fontSize: 16,
    marginLeft: 8,
  },
  errorMessage: {
    color: "red",
    marginLeft: 10,
  },
});

export default Register;
