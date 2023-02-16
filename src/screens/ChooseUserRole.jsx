import React from "react";
import DisplayContainer from "../components/DisplayContainer";
import InputForm from "../components/InputForm";

const ChooseUserRole = ({ navigation }) => {

  return (
    <DisplayContainer>
      <InputForm
        fields={[
          { label: "Profesión", name: "role", type: "text" },
          { label: "Último puesto", name: "lastPlace", type: "text" },
          { label: "Última empresa", name: "lastCompany", type: "text" },
        ]}
        onSubmit={(values) => {
          navigation.navigate("ChooseCountry", {
            userRole: values[0],
            userLastRole: values[1],
            userLastCompany: values[2],
          });
        }}
        questionText="Tu perfil te ayudará a encontrar el trabajo que buscas."
        requestText="Descubre nuevas oportunidades y personas"
      />
    </DisplayContainer>
  );
};

export default ChooseUserRole;
