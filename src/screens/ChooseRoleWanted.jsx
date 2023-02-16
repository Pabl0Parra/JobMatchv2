import React from "react";
import InputForm from "../components/InputForm";
import { useNavigation } from "@react-navigation/native";
import DisplayContainer from "../components/DisplayContainer";

const ChooseRoleWanted = () => {
  const navigation = useNavigation();

  return (
    <DisplayContainer>
      <InputForm
        fields={[{ label: "Perfil", name: "role", type: "text" }]}
        onSubmit={(values) => {
          navigation.navigate("ChooseCountry", { role: values[0] });
        }}
        questionText="¿Qué perfil buscas?"
        requestText="Por favor, introduce el rol deseado:"
      />
    </DisplayContainer>
  );
};

export default ChooseRoleWanted;
