import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
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
      <RegisterProgressBar currentStep={2} />
      <View style={styles.bgContainer}>
        <Drawing />
      </View>
      <DisplayContainer>
        <View style={styles.inputFormContainer}>
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
          />
        </View>
      </DisplayContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${colors.background}`,
  },
  bgContainer: {
    alignItems: "left",
    marginTop: 20,
  },
  inputFormContainer: {
    marginTop: -510,
    marginHorizontal: 20,
    alignItems: "left",
  },
});

export default ChooseUserName;
