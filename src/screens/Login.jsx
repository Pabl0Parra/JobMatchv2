import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import LogoForBlueBackround from "../svgs/LogoForBlueBackground";
import DisplayContainer from "../components/DisplayContainer";
import loginWithEmail from "../firebase/functions/loginWithEmailPassword";
import loginWithGoogle from "../firebase/functions/loginWithGoogle";
import InputForm from "../components/InputForm";

const Login = ({ navigation }) => {
  return (
    <DisplayContainer>
      <View
        style={[
          styles.background,
          {
            marginBottom: 30,
            width: "120%",
            borderBottomLeftRadius: 90,
            borderBottomRightRadius: 90,
          },
        ]}
      >
        <Image style={[styles.image]} source={require("../images/image4.png")} />
      </View>
      <View style={[styles.background, { backgroundColor: "#ffffff" }]}></View>
      <View style={styles.group}>
        <View style={{ marginLeft: -30 }}>
          <LogoForBlueBackround />
          <Text style={{ ...styles.textTop, lineHeight: 30, marginTop: 20 }}>
            ¡Te estabamos {"\n"}esperando!
          </Text>
          <Text style={{ ...styles.textTop, fontSize: 15 }}>
            Conecta con las mejores {"\n"}opciones laborales
          </Text>
        </View>
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
            buttonText="Iniciar Sesión"
          />
          <Text
            style={[
              styles.text,
              styles.textButton,
              { paddingVertical: 8, fontWeight: "700" },
            ]}
          >
            o iniciar sesión con
          </Text>
          <View>
            <TouchableOpacity
              style={styles.buttonGoogle}
              onPress={(e) =>
                loginWithGoogle() 
              }
            >
              <Image
                style={styles.imageGoogle}
                source={require("../images/google_buscador.png")}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.text, { paddingVertical: 8 }]}>
            ¿Aún no tienes una cuenta?{" "}
            <Text
              style={{
                ...styles.text,
                ...styles.textButton,
                fontWeight: "700",
              }}
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
  background: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#192B65",
  },
  group: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTop: {
    color: "white",
    textAlign: "left",
    fontWeight: "400",
    fontSize: 32,
  },
  boxForm: {
    flex: 1,
    borderRadius: 55,
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginTop: 30,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "semibold",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 288,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
  },
  textButton: {
    color: "#1D1152",
    fontSize: 16,
    marginLeft: 8,
  },
  buttonGoogle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  imageGoogle: {
    width: 70,
    height: 70,
  },
});

export default Login;
