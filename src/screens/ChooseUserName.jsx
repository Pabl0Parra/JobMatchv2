import React from "react";
import InputForm from "../components/InputForm";

const ChooseUserName = ({ navigation }) => {
  return (
    <InputForm
      fields={[
        { label: "Nombre de usuario", value: "" },
        { label: "Apellido de usuario", value: "" },
      ]}
      onSubmit={(values) => {
        navigation.navigate("ChooseUserType", {
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
