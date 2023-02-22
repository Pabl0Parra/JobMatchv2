import React, { useContext } from 'react';
import InputForm from '../components/InputForm';
import { useNavigation } from '@react-navigation/native';
import DisplayContainer from '../components/DisplayContainer';
import { UserDataContext } from '../context/UserDataContext';

const ChooseCompanyName = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  return (
    <DisplayContainer>
      <InputForm
        fields={[
          { label: 'Nombre de la empresa', name: 'company', type: 'text' },
          { label: 'Sector de la empresa', name: 'sector', type: 'text' },
        ]}
        onSubmit={(values) => {
          setUserData({ ...userData, company: values[0], sector: values[1] });
          navigation.navigate('ChooseRoleWanted');
        }}
        questionText="¿Cómo se llama la empresa?"
        requestText="Introduce los siguientes datos:"
        buttonText="Siguiente"
      />
    </DisplayContainer>
  );
};

export default ChooseCompanyName;
