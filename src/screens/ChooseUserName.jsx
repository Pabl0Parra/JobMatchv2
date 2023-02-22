import React, { useContext } from "react";
import DisplayContainer from "../components/DisplayContainer";
import InputForm from "../components/InputForm";
import { UserDataContext } from "../context/UserDataContext";

const ChooseUserName = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <DisplayContainer>
      <InputForm
        fields={[
          { label: "Nombre de usuario", name: "name", type: "text" },
          { label: "Apellido de usuario", name: "lastName", type: "text" },
        ]}
        onSubmit={(values) => {
          setUserData({
            ...userData,
            userName: values[0],
            userLastName: values[1],
          });
          navigation.navigate("ChooseUserRole");
        }}
        questionText="¿Cómo te llamas?"
        requestText="Introduce los siguientes datos:"
        buttonText="Siguiente"
      />
    </DisplayContainer>
  );
};

export default ChooseUserName;
