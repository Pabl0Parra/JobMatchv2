import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import InputForm from "../components/InputForm";
import { useNavigation } from "@react-navigation/native";
import DisplayContainer from "../components/DisplayContainer";
import { UserDataContext } from "../context/UserDataContext";
import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";
import Drawing from "../svgs/Drawing";

const ChooseCompanyName = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  return (
    <>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={2} />
      <View style={styles.bgContainer}>
        <Drawing />
      </View>
      <DisplayContainer style={{ justifyContent: "flex-start", marginTop: 11 }}>
        <InputForm
          fields={[
            { label: "Nombre de la empresa", name: "userName", type: "text" },
            { label: "Sector de la empresa", name: "sector", type: "text" },
          ]}
          onSubmit={(values) => {
            setUserData({
              ...userData,
              userName: values[0],
              sector: values[1],
            });
            navigation.navigate("ChooseRoleWanted");
          }}
          questionText="¿Cómo se llama la empresa?"
          requestText="Introduce los siguientes datos:"
          buttonText={"Siguiente"}
          styleText={{
            question: {
              alignSelf: "flex-start",
              marginLeft: 14,
              fontWeight: 500,
              fontSize: 20,
            },
            request: {
              alignSelf: "flex-start",
              marginLeft: 14,
              fontWeight: 400,
              fontSize: 14,
            },
          }}
          buttonMarginTop={{ marginTop: 120 }}
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

export default ChooseCompanyName;
