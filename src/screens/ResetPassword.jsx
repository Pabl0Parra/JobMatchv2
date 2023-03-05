import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Image } from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import checkRegisteredEmail from "../firebase/functions/checkRegisteredEmail";
import sendEmailResetPass from "../firebase/functions/sendEmailResetPass";
import InputForm from "../components/InputForm";
import AwesomeAlert from "react-native-awesome-alerts";
import theme from "../theme";

const colors = theme.colors;

const ResetPassword = () => {
  const navigation = useNavigation();

  const requestNewPassword = async (values) => {
    const registeredUser = await checkRegisteredEmail(values[0]);

    if (!registeredUser) {
      <AwesomeAlert
        show={userNotFound}
        title="No hemos encontrado ninguna cuenta asociada a ese email 🔒"
        message="Innténtelo de nuevo."
        closeOnTouchOutside={true}
        onDismiss={() => setIncorrectPassword(false)}
        onConfirmPressed={() => setIncorrectPassword(false)}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={colors.secondary}
      />;
      console.log(
        `No hemos encontrado ninguna cuenta asociada a ${values[0]}. Prueba con otro email.`
      );
    } else {
      console.log(
        `Introduce el código de verificación de 6 dígitos que te hemos enviado a ${values[0]}.`
      );
      sendEmailResetPass(values[0]);
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
      <View style={styles.boxForm}>
        <InputForm
          fields={[{ label: "Correo", name: "email", type: "email" }]}
          onSubmit={requestNewPassword}
          questionText="¿Has olvidado tu contraseña?"
          requestText="Restablecer la contraseña en dos pasos rápidos"
          styleText={{
            question: {
              fontSize: 18,
            },
            request: {
              fontSize: 16,
            },
          }}
          buttonText="Restablecer la contraseña"
        />
        <Text style={styles.text} onPress={() => navigation.navigate("Login")}>
          Volver
        </Text>
      </View>
    </DisplayContainer>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  background: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#192B65",
  },
  boxForm: {
    position: "absolute",
    flex: 1,
    marginTop: 30,
    padding: 15,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "semibold",
    marginTop: 15,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
