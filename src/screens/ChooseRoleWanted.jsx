import React from "react";
import InputForm from "../components/InputForm";

const ChooseRoleWanted = ({ navigation }) => {
  return (
    <InputForm
      fields={[{ label: "Perfil", value: "" }]}
      onSubmit={(values) => {
        navigation.navigate("ChooseCompanyLogo", { role: values[0] });
      }}
      questionText="¿Qué perfil buscas?"
      requestText="Por favor, introduce el rol deseado:"
    />
  );
};

export default ChooseRoleWanted;
