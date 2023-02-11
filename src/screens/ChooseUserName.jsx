import React from "react";
import InputForm from "../components/InputForm";
import { useNavigation } from "@react-navigation/native";

const ChooseUserName = () => {
  const navigation = useNavigation();

  return (
    <InputForm
      fields={[
        { label: "Nombre de usuario", value: "" },
        { label: "Apellido de usuario", value: "" },
      ]}
      onSubmit={(values) => {
        navigation.navigate("ChooseUserRole", {
          userName: values[0],
          userLastName: values[1],
        });
      }}
      questionText="¿Cómo te llamas?"
      requestText="Introduce los siguientes datos:"
    />
  );
};

export default ChooseUserName;
