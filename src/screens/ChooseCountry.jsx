import React, { useContext } from 'react';
import InputForm from '../components/InputForm';
import { useNavigation } from '@react-navigation/native';
import DisplayContainer from '../components/DisplayContainer';
import { UserDataContext } from '../context/UserDataContext';

const ChooseCountry = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  return (
    <DisplayContainer>
      <InputForm
        fields={[
          { label: 'País', name: 'country', type: 'text' },
          { label: 'Ciudad', name: 'city', type: 'text' },
        ]}
        onSubmit={(values) => {
          setUserData({ ...userData, country: values[0], city: values[1] });
          navigation.navigate('ChooseProfilePicture');
        }}
        questionText="Te damos la bienvenida,"
        requestText="Introduce los siguientes datos:"
      />
    </DisplayContainer>
  );
};

export default ChooseCountry;
