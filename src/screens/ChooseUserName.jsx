import React from "react";
import DisplayContainer from "../components/DisplayContainer";
import InputForm from "../components/InputForm";

const ChooseUserName = ({ navigation }) => {
  return (
    <DisplayContainer>
      <InputForm
        fields={[
          { label: "Nombre de usuario", name: "name", type: "text" },
          { label: "Apellido de usuario", name: "lastName", type: "text" },
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
    </DisplayContainer>
  );
};

export default ChooseUserName;
