import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import DisplayContainer from "../components/DisplayContainer";
import InputContainer from "../components/InputContainer";
import ReusableButton from "../components/ReusableButton";
import theme from "../theme";
import * as yup from "yup";
import addExperience from "../firebase/functions/addExperience";
import { useContext, useState } from "react";
import { UserLoginContex } from "../context/UserDataContext";
import { useNavigation } from "@react-navigation/core";
import getUserDataDB from "../firebase/functions/getUserDataDB";
import { useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { updateExperienceOrPost } from "../firebase/functions/updateFunctions";

const { text, colors } = theme;

const ExperienceForm = () => {
  const { userData, setUserData } = useContext(UserLoginContex);
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const inicialValue = {
    position: route.params ? route.params.position : "",
    description: route.params ? route.params.description : "",
    period: route.params ? route.params.period : "",
    country: route.params ? route.params.country : "",
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
      <View style={styles.boxReturn}>
        <TouchableOpacity
          style={styles.arrowLeft}
          onPress={(e) => navigation.navigate("Perfil")}
        >
          <AntDesign name="arrowleft" size={36} color={colors.secondary} />
        </TouchableOpacity>
        <Text style={[text.headerTitle , styles.headerText]}>{route.params ? "Editar experiencia" : "Crear experiancia"}</Text>
      </View>
      <Formik
        initialValues={inicialValue}
        validationSchema={yup.object().shape(validationSchema)}
        onSubmit={async (obj) => {
          setLoading(true)
          try {
            route.params
              ? await updateExperienceOrPost(obj, userData.id, route.params.id, userData.worker)
              : await addExperience(obj, userData.id);
            const res = await getUserDataDB(userData.id);

            if (res) {
              setUserData(res);
              navigation.navigate("Perfil");
            } else {
              console.log("error al obtener los datos");
            }
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
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
              innerText={"Aceptar"}
              onPress={handleSubmit}
            />
            <ReusableButton
              innerText={"Cancelar"}
              onPress={() => navigation.navigate("Perfil")}
              styleContainer={{ backgroundColor: "#888" }}
              styleText={{ color: "#ddd" }}
            />
          </ScrollView>
        )}
      </Formik>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.secondary} size={130} />
        </View>
      ) : null}
    </DisplayContainer>
  );
};

export default ExperienceForm;

const styles = StyleSheet.create({
  displayContainer: {
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight + 15,
  },
  textMultiline: {
    height: 130,
    textAlign: "justify",
    textAlignVertical: "top",
  },
  boxReturn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginLeft: 28,
    marginBottom: 15,
  },
  headerText: {
  },
  arrowLeft: {
    marginHorizontal: 15
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(20, 20, 20, .4)",
    alignItems: "center",
    zIndex: 2,
  },
});
