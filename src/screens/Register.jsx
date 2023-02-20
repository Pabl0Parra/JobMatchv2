import React, { useContext } from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import checkRegisteredEmail from "../firebase/functions/checkRegisteredEmail";
import { useNavigation } from "@react-navigation/native";
import { UserDataContext } from "../context/UserDataContext";
import InputForm from "../components/InputForm";
import LogoForBlueBackround from "../svgs/LogoForBlueBackground";
import { AntDesign } from "@expo/vector-icons";

const Register = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserDataContext);

  const formSubmit = async (values) => {
    const registeredUser = await checkRegisteredEmail(values[0]);

    if (registeredUser) {
      // implementar un mensaje de error con AwesomeAlert
      console.log("ya hay un usuario registrado con el email proporcionado");
    } else {
      setUserData({ ...userData, email: values[0], password: values[1] });
      navigation.navigate("RegisterStack");
    }
  };

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
        <Image
          style={[styles.image]}
          source={require("../images/image4.png")}
        />
      </View>
      <View style={[styles.background, { backgroundColor: "#ffffff" }]}></View>
      <View style={styles.group}>
        <View style={styles.boxReturn}>
          <TouchableOpacity
            style={styles.arrowleft}
            onPress={(e) => navigation.navigate("Login")}
          >
            <AntDesign name="arrowleft" size={26} color="white" />
          </TouchableOpacity>
          <View style={{ width: 15 }} />
          <Text style={[styles.text, styles.textTop, { fontSize: 26, marginBottom: 4 }]}>
            Crear Cuenta
          </Text>
        </View>
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
              },
              {
                label: "Verificar contraseña",
                name: "password2",
                type: "password",
              },
            ]}
            onSubmit={formSubmit}
            requestText="Crear cuenta"
            buttonText="Crear cuenta"
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
              onPress={(e) => console.log("")}
            >
              <Image
                style={styles.imageGoogle}
                source={require("../images/google_buscador.png")}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.text, { paddingVertical: 8 }]}>
            ¿Tienes cuenta?{" "}
            <Text
              style={{
                ...styles.text,
                ...styles.textButton,
                fontWeight: "700",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Entra aquí
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
  boxReturn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginLeft: 5,
    marginBottom: 30,
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

export default Register;
