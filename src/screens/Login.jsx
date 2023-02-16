import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import loginWithEmail from "../firebase/functions/loginWithEmailPassword";
import { useNavigation } from "@react-navigation/native";
import InputContainer from "../components/InputContainer";
import InputForm from "../components/InputForm";

const Login = () => {
  const navigation = useNavigation();

  return (
    <DisplayContainer style={{ marginHorizontal: 20 }}>
      <Image
        style={styles.image}
        source={{
          uri: `https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/mathier190500002.jpg`,
        }}
      />
      <View>
        <Text style={styles.textDescription}>
          Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, est a, mattis tellus.
        </Text>
      </View>
      <View>
        <InputForm
          fields={[
            { label: "Correo", name: "email", type: "email" },
            { label: "Contraseña", name: "password", type: "password", recoverPassword: true },
          ]}
          onSubmit={(values) => {
            loginWithEmail(values[0], values[1])
          }}
          requestText="Iniciar Sesión"
        />
      </View>
      <View>
        <Text style={styles.text}>
          ¿Aún no tienes una cuenta?
          <Text
            style={{ ...styles.text, ...styles.textButton }}
            onPress={() => navigation.navigate("Register")}
          >
            Crear cuenta
          </Text>
        </Text>
      </View>
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
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 18,
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
  }
});

export default Login;

{/* <Text style={styles.textDescription}>O</Text>
<TouchableOpacity style={styles.button} onPress={(e) => console.log(e)}>
<Text style={{ ...styles.text, color: "#666666" }}>
iniciar sesión con Google
</Text>
</TouchableOpacity> */}