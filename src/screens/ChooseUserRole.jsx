import React from "react";
import InputForm from "../components/InputForm";

const ChooseUserRole = ({ navigation }) => {
  return (
    <InputForm
      fields={[
        { label: "Profesión", value: "" },
        { label: "Último puesto", value: "" },
        { label: "Última empresa", value: "" },
      ]}
      onSubmit={(values) => {
        navigation.navigate("ChooseProfilePicture", {
          userRole: values[0],
          userLastRole: values[1],
          userLastCompany: values[2],
        });
      }}
      questionText="Tu perfil te ayudará a encontrar el trabajo que buscas."
      requestText="Descubre nuevas oportunidades y personas"
    />
  );
};

export default ChooseUserRole;
