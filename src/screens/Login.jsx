import { Text, StyleSheet, View } from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import loginWithEmail from "../firebase/functions/loginWithEmailPassword";
import InputForm from "../components/InputForm";
import LogoSvg from "../componentsSVG/LogoSvg";
import Constants from "expo-constants";

const Login = ({ navigation }) => {
  return (
    <DisplayContainer>
      {/* 
        <View style={styles.groupTop}>
          <LogoSvg />
          <Text style={{ ...styles.textTop, lineHeight: 30, marginTop: 15 }}>
            ¡Te estabamos {"\n"}esperando!
          </Text>
          <Text style={{ ...styles.textTop, fontSize: 15 }}>
            Conecta con las mejores {"\n"}opciones laborales
          </Text>
        </View>
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
      </View> */}
      <View
        style={[styles.background, { paddingTop: Constants.statusBarHeight, 
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10
         }]}
      >
        <View style={styles.groupTop}>
          <LogoSvg />
          <Text style={{ ...styles.textTop, lineHeight: 30, marginTop: 20 }}>
            ¡Te estabamos {"\n"}esperando!
          </Text>
          <Text style={{ ...styles.textTop, fontSize: 15 }}>
            Conecta con las mejores {"\n"}opciones laborales
          </Text>
        </View>
      </View>
      <View style={[styles.background, { backgroundColor: "#ffffff" }]}></View>
      <View style={styles.boxForm}>
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
        <Text style={[styles.text, { paddingVertical: 14 }]}>
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
  background: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#192B65",
  },
  groupTop: {
    position: "relative",
    top: 80,
    left: -20,
  },
  textTop: {
    color: "white",
    textAlign: "left",
    fontWeight: "400",
    fontSize: 32,
  },
  boxForm: {
    flex: 1,
    position: "absolute",
    top: "42%",
    borderRadius: 55,
    paddingHorizontal: 14,
    paddingBottom: 15,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    /* shadowColor: "#red",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3, */
  },
  image: {
    width: 79,
    height: 79,
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
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
