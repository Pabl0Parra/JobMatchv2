import React, { useContext } from "react";
import InputForm from "../components/InputForm";
import { useNavigation } from "@react-navigation/native";
import DisplayContainer from "../components/DisplayContainer";
import { UserDataContext } from "../context/UserDataContext";

const ChooseRoleWanted = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  return (
    <DisplayContainer>
      <InputForm
        fields={[{ label: "Perfil", name: "role", type: "text" }]}
        onSubmit={(values) => {
          setUserData({ ...userData, roleWanted: values[0] });
          navigation.navigate("ChooseCountry");
        }}
        questionText="¿Qué perfil buscas?"
        requestText="Por favor, introduce el rol deseado:"
        buttonText="Siguiente"
      />
    </DisplayContainer>
  );
};

export default ChooseRoleWanted;
