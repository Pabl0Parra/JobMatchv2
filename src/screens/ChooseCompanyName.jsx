import React from "react";
import InputForm from "../components/InputForm";
import { useNavigation } from "@react-navigation/native";

const ChooseCompanyName = () => {
  const navigation = useNavigation();

  return (
    <InputForm
      fields={[
        { label: "Nombre de la empresa", name: "company", type: "text" },
        { label: "Sector de la empresa", name: "sector", type: "text" },
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
