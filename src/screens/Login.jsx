import { useState } from "react";
import {
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import loginWithEmail from "../firebase/functions/loginWithEmailPassword";
import loginWithGoogle from "../firebase/functions/LoginWithGoogle";
import { useNavigation } from '@react-navigation/native';

const Login = ({navigate}) => {

  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  const navigation = useNavigation();

  const emailLogin = async (e) => {

    const res = await loginWithEmail(dataLogin.email, dataLogin.password);

    if (res === undefined) {
      return console.log("email o password incorrecto");
    } else {
      navigation.navigate('Home');
    };

  };

  return (
    <DisplayContainer>
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
        <Text style={styles.text}>Iniciar sesión</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={dataLogin.email}
          onChange={(e) =>
            setDataLogin({ ...dataLogin, email: e.target.value })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={dataLogin.password}
          onChange={(e) =>
            setDataLogin({ ...dataLogin, password: e.target.value })
          }
        />
      </View>
      <View style={{ gap: 10 }}>
        <Pressable style={styles.button} onPress={emailLogin}>
          <Text style={{ ...styles.text, color: "#666666" }}>
            iniciar sesión
          </Text>
        </Pressable>
        <Text style={styles.textDescription}>O</Text>
        <Pressable style={styles.button} onPress={(e) => console.log(e)}>
          <Text style={{ ...styles.text, color: "#666666" }}>
            iniciar sesión con Google
          </Text>
        </Pressable>
      </View>
      <Text style={styles.text}>¿Aún no tienes una cuenta? Crear cuenta</Text>
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
});

export default Login;