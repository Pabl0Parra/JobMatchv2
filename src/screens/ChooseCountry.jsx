import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import InputForm from "../components/InputForm";
import { useNavigation } from "@react-navigation/native";
import DisplayContainer from "../components/DisplayContainer";
import { UserDataContext } from "../context/UserDataContext";
import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";
import HandHeart from "../svgs/HandHeart";

const ChooseCountry = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  return (
    <>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={4} />
      <View style={styles.bgContainer}>
        <HandHeart />
      </View>
      <DisplayContainer>
        <InputForm
          fields={[
            { label: "País", name: "country", type: "text" },
            { label: "Ciudad", name: "city", type: "text" },
          ]}
          onSubmit={(values) => {
            setUserData({ ...userData, country: values[0], city: values[1] });
            navigation.navigate("ChooseProfilePicture");
          }}
          questionText="Te damos la bienvenida,"
          requestText="Introduce los siguientes datos:"
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

export default ChooseCountry;
