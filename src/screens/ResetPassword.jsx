import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import checkRegisteredEmail from "../firebase/functions/checkRegisteredEmail";
import sendEmailResetPass from "../firebase/functions/SendEmailResetPass";

const ResetPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");

  const requestNewPassword = async () => {
    const registeredUser = await checkRegisteredEmail(email);

    if (!registeredUser) {
      // implementar un mensaje de error con AwesomeAlert
      console.log(
        `No hemos encontrado ninguna cuenta asociada a ${email}. Prueba con otro email.`
      );
    } else {
        console.log(
            `Introduce el código de verificación de 6 dígitos que te hemos enviado a ${email}.`
          );
        sendEmailResetPass(email)
    }
  };

  return (
    <DisplayContainer>
      <Text style={{ ...styles.text, fontSize: 26 }}>
        ¿Has olvidado tu contraseña?
      </Text>
      <Text style={styles.text}>
        Restablecer la contraseña en dos pasos rápidos
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TouchableOpacity style={styles.button} onPress={requestNewPassword}>
        <Text style={{ ...styles.text, color: "#666666" }}>
          Restablecer la contraseña
        </Text>
      </TouchableOpacity>
      <Text style={styles.text} onPress={() => navigation.navigate("Login")}>
        Volver
      </Text>
    </DisplayContainer>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "semibold",
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
});
