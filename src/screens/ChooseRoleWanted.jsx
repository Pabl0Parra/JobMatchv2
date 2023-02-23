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
      <RegisterProgressBar currentStep={3} />
      <View style={styles.bgContainer}>
        <FillingProfile />
      </View>
      <DisplayContainer>
        <InputForm
          fields={[{ label: "Perfil", name: "role", type: "text" }]}
          onSubmit={(values) => {
            setUserData({ ...userData, roleWanted: values[0] });
            navigation.navigate("ChooseCountry");
          }}
          questionText="¿Qué perfil buscas?"
          requestText="Por favor, introduce el rol deseado:"
        />
      </DisplayContainer>
    </>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    alignItems: "left",
    marginTop: 20,
  },
});

export default ChooseRoleWanted;
