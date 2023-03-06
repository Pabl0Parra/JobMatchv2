import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import InputForm from "../components/InputForm";
import { UserDataContext } from "../context/UserDataContext";
import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";
import Drawing from "../svgs/Drawing";
import theme from "../theme";

const { colors } = theme;

const ChooseUserName = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <View style={styles.container}>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={2} numSteps={5} />
      <View style={styles.bgContainer}>
        <Drawing />
      </View>
      <DisplayContainer style={{ justifyContent: "flex-start" }}>
        <View>
          <InputForm
            fields={[
              { label: "Nombre de usuario", name: "name", type: "text" },
              { label: "Apellido de usuario", name: "lastName", type: "text" },
            ]}
            onSubmit={(values) => {
              setUserData({
                ...userData,
                userName: values[0],
                userLastName: values[1],
              });
              navigation.navigate("ChooseUserRole");
            }}
            questionText="¿Cómo te llamas?"
            requestText="Escribe tu nombre real ya que Jobmatch está enfocado en un ámbito laboral"
            buttonText={"Siguiente"}
            styleText={{
              question: {
                alignSelf: "flex-start",
                marginLeft: 20,
                fontWeight: "500",
                fontSize: 20,
              },
              request: {
                alignSelf: "flex-start",
                marginLeft: 20,
                fontWeight: "400",
                fontSize: 14,
              },
            }}
            buttonMarginTop={30}
          />
        </View>
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
    marginTop: 20,
  },
});

export default ChooseUserName;
