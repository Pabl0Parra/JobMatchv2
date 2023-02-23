import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
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
    <>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={3} />
      <View style={styles.bgContainer}>
        <FillingProfile />
      </View>
      <DisplayContainer>
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
          requestText="A encontrar nuevas oportunidades laborales"
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

export default ChooseUserRole;
