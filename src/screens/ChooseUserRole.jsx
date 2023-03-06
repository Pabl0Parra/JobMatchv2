import React, { useContext } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import InputForm from "../components/InputForm";
import { UserDataContext } from "../context/UserDataContext";
import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";
import FillingProfile from "../svgs/FillingProfile";
import theme from "../theme";

const { colors } = theme;

const ChooseUserRole = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <View style={styles.container}>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={3} numSteps={5} />
      <View style={styles.bgContainer}>
        <FillingProfile />
      </View>
      <DisplayContainer style={{ justifyContent: "flex-start", marginTop: 8 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={10}
        >
          <InputForm
            fields={[
              { label: "Profesión", name: "role", type: "text" },
              { label: "Último puesto", name: "lastPlace", type: "text" },
              { label: "Última empresa", name: "lastCompany", type: "text" },
            ]}
            onSubmit={(values) => {
              setUserData({
                ...userData,
                userRole: values[0],
                userLastRole: values[1],
                userLastCompany: values[2],
              });
              navigation.navigate("ChooseCountry");
            }}
            questionText="Tu perfil te ayuda"
            requestText="Encuentra nuevas oportunidades laborales"
            buttonText={"Siguiente"}
            styleText={{
              question: {
                alignSelf: "flex-start",
                marginLeft: 16,
                fontWeight: "500",
                fontSize: 20,
              },
              request: {
                alignSelf: "flex-start",
                marginLeft: 16,
                fontWeight: "400",
                fontSize: 14,
              },
            }}
            buttonMarginTop={30}
          />
        </KeyboardAvoidingView>
      </DisplayContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${colors.background}`,
  },
  bgContainer: {
    alignItems: "flex-start",
    marginTop: 8,
  },
});

export default ChooseUserRole;
