import React from "react";
import InputForm from "../components/InputForm";

const ChooseCompanyName = ({ navigation }) => {
  return (
    <InputForm
      fields={[
        { label: "Nombre de la empresa", value: "" },
        { label: "Sector de la empresa", value: "" },
      ]}
      onSubmit={(values) => {
        navigation.navigate("ChooseRoleWanted", {
          company: values[0],
          sector: values[1],
        });
      }}
      questionText="¿Cómo se llama la empresa?"
      requestText="Introduce los siguientes datos:"
    />
  );
};

export default ChooseCompanyName;
