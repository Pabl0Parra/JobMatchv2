import React, { useContext } from "react";
import DisplayContainer from "../components/DisplayContainer";
import InputForm from "../components/InputForm";
import { UserDataContext } from "../context/UserDataContext";
import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";

const ChooseUserName = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={2} />
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
          requestText="Escribe tu nombre real ya que Jobmatch está enfocado en un ámbito laboral"
        />
      </DisplayContainer>
    </>
  );
};

export default ChooseUserName;
