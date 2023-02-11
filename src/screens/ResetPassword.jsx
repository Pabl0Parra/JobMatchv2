import { StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {

  const navigation = useNavigation();

  return (
    <DisplayContainer>
      <Text style={{ ...styles.text, fontSize: 26 }}>
        ¿Has olvidado tu contraseña?
      </Text>
      <Text style={styles.text}>
        Restablecer la contraseña en dos pasos rápidos
      </Text>
      <TextInput style={styles.input} placeholder="Correo" />
      <TouchableOpacity style={styles.button} onPress={(e) => console.log(e)}>
        <Text style={{ ...styles.text, color: "#666666" }}>
          Restablecer la contraseña
        </Text>
      </TouchableOpacity>
      <Text
        style={{ ...styles.text, color: "#666666" }}
        onPress={() => navigation.navigate("Login")}
      >
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
