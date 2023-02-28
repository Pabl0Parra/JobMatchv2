import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Formik } from "formik";
import DisplayContainer from "../components/DisplayContainer";
import InputContainer from "../components/InputContainer";
import ReusableButton from "../components/ReusableButton";
import theme from "../theme";
import * as yup from "yup";
import addExperience from "../firebase/functions/addExperience";
import { useContext } from "react";
import { UserLoginContex } from "../context/UserDataContext";
import { useNavigation } from "@react-navigation/core";

const { text, colors } = theme;

const ExperiencieForm = ({ dataForm }) => {
  const { userData, setUserData } = useContext(UserLoginContex);
  const navigation = useNavigation();

  const inicialValue = {
    position: dataForm? "" : "",
    description: dataForm? "" : "",
    period: dataForm? "" : "",
    country: dataForm? "" : "",
  };

  const yupText = yup.string().required("Este campo es requerido");

  const validationSchema = {
    position: yupText,
    description: yupText,
    period: yupText,
    country: yupText,
  };

  return (
    <DisplayContainer style={styles.displayContainer}>
      <Formik
        initialValues={inicialValue}
        validationSchema={yup.object().shape(validationSchema)}
        onSubmit={(obj) => {
          addExperience(obj, userData.id);
          navigation.navigate("Perfil");
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <View>
              <InputContainer
                value={values.position}
                placeholder={"Puesto"}
                onChangeText={handleChange(`position`)}
                touched={touched["position"]}
                error={errors["position"]}
                stylePlaceholder={{ backgroundColor: colors.background }}
              />
              <InputContainer
                value={values.description}
                placeholder={"Descripcion"}
                onChangeText={handleChange(`description`)}
                touched={touched["description"]}
                error={errors["description"]}
                stylePlaceholder={{ backgroundColor: colors.background }}
                styleContainer={styles.textMultiline}
                multiline={true}
                numberOfLines={6}
              />
              <InputContainer
                value={values.period}
                placeholder={"Periodo"}
                onChangeText={handleChange(`period`)}
                touched={touched["period"]}
                error={errors["period"]}
                stylePlaceholder={{ backgroundColor: colors.background }}
              />
              <InputContainer
                value={values.country}
                placeholder={"Pais"}
                onChangeText={handleChange(`country`)}
                touched={touched["country"]}
                error={errors["country"]}
                stylePlaceholder={{ backgroundColor: colors.background }}
              />
            </View>
            <ReusableButton
              styleContainer={{ marginVertical: 10 }}
              innerText={"siguiente"}
              onPress={handleSubmit}
            />
            <ReusableButton innerText={"cancelar"} />
          </ScrollView>
        )}
      </Formik>
    </DisplayContainer>
  );
};

export default ExperiencieForm;

const styles = StyleSheet.create({
  displayContainer: {
    justifyContent: "flex-start",
  },
  textMultiline: {
    height: 130,
    textAlign: "justify",
    textAlignVertical: "top",
  },
});
