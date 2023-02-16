import { Text, StyleSheet, View } from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import loginWithEmail from "../firebase/functions/loginWithEmailPassword";
import { useNavigation } from "@react-navigation/native";
import InputForm from "../components/InputForm";
import LogoSvg from "../componentsSVG/LogoSvg";

const Login = () => {
  const navigation = useNavigation();

  return (
    <DisplayContainer>
      <View style={styles.background}>
        <View style={styles.groupTop}>
          <LogoSvg />
          <Text style={{ ...styles.textTop, lineHeight: 45, marginTop: 15 }}>
            ¡Te estabamos {"\n"}esperando!
          </Text>
          <Text style={{ ...styles.textTop, fontSize: 20 }}>
            Conecta con las mejores {"\n"}opciones laborales
          </Text>
        </View>
        <View style={styles.backgroundForm}>
          <InputForm
            fields={[
              { label: "Correo", name: "email", type: "email" },
              {
                label: "Contraseña",
                name: "password",
                type: "password",
                recoverPassword: true,
              },
            ]}
            onSubmit={(values) => {
              loginWithEmail(values[0], values[1]);
            }}
            requestText="Iniciar Sesión"
          />
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
      </View>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  groupTop: {
    gap: 5,
    paddingLeft: 12
  },
  background: {
    position: "absolute",
    top: 0,
    height: "48%",
    width: "100%",
    paddingTop: 360,
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 35,
    backgroundColor: "#192B65",
    borderBottomLeftRadius: "9% 4%",
    borderBottomRightRadius: "9% 4%",
  },
  textTop: {
    color: "white",
    textAlign: "left",
    fontWeight: 400,
    fontSize: 48
  },
  backgroundForm: {
    alignItems: "center",
    gap: 20,
    borderRadius: 55,
    paddingVertical: 24,
    paddingHorizontal: 34,
    backgroundColor: "#FFFFFF",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
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
  },
});

export default Login;

{
  /* <Text style={styles.textDescription}>O</Text>
<TouchableOpacity style={styles.button} onPress={(e) => console.log(e)}>
<Text style={{ ...styles.text, color: "#666666" }}>
iniciar sesión con Google
</Text>
</TouchableOpacity> */
}
