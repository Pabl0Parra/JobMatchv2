import React from "react";
import InputForm from "../components/InputForm";
import { useNavigation } from "@react-navigation/native";

const ChooseRoleWanted = () => {
  const navigation = useNavigation();

  return (
    <InputForm
      fields={[{ label: "Perfil", value: "" }]}
      onSubmit={(values) => {
        navigation.navigate("ChooseProfilePicture", { role: values[0] });
      }}
      questionText="¿Qué perfil buscas?"
      requestText="Por favor, introduce el rol deseado:"
    />
  );
};

export default ChooseRoleWanted;
