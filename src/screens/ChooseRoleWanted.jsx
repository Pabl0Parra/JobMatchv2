import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import InputForm from "../components/InputForm";
import { useNavigation } from "@react-navigation/native";
import DisplayContainer from "../components/DisplayContainer";
import { UserDataContext } from "../context/UserDataContext";
import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";
import FillingProfile from "../svgs/FillingProfile";

const ChooseRoleWanted = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  return (
    <>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={3} numSteps={5} />
      <View style={styles.bgContainer}>
        <FillingProfile />
      </View>
      <DisplayContainer style={{ justifyContent: "flex-start", marginTop: 10 }}>
        <InputForm
          fields={[{ label: "Perfil", name: "role", type: "text" }]}
          onSubmit={(values) => {
            setUserData({ ...userData, roleWanted: values[0] });
            navigation.navigate("ChooseCountry");
          }}
          questionText="¿Qué perfil buscas?"
          requestText="Por favor, introduce el rol deseado:"
          buttonText={"Siguiente"}
          styleText={{
            question: {
              alignSelf: "flex-start",
              marginLeft: 14,
              fontWeight: "500",
              fontSize: 20,
            },
            request: {
              alignSelf: "flex-start",
              marginLeft: 14,
              fontWeight: "400",
              fontSize: 14,
            },
          }}
          buttonMarginTop={30}
        />
      </DisplayContainer>
    </>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    alignItems: "flex-start",
    marginTop: 20,
  },
});

export default ChooseRoleWanted;
