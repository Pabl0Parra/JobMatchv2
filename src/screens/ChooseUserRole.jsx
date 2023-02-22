import React, { useContext } from "react";
import DisplayContainer from "../components/DisplayContainer";
import InputForm from "../components/InputForm";
import { UserDataContext } from "../context/UserDataContext";
import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";

const ChooseUserRole = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={3} />
      <DisplayContainer>
        <InputForm
          fields={[
            { label: "Profesión", name: "role", type: "text" },
            { label: "Último puesto", name: "lastPlace", type: "text" },
            { label: "Última empresa", name: "lastCompany", type: "text" },
          ]}
          onSubmit={(values) => {
            setUserData({
              ...userData,
              userRole: values[0],
              userLastRole: values[1],
              userLastCompany: values[2],
            });
            navigation.navigate("ChooseCountry");
          }}
          questionText="Tu perfil te ayudará a encontrar el trabajo que buscas."
          requestText="Descubre nuevas oportunidades y personas"
        />
      </DisplayContainer>
    </>
  );
};

export default ChooseUserRole;
