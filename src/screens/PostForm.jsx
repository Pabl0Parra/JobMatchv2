import { collection, doc, serverTimestamp, setDoc } from "@firebase/firestore";

import { useNavigation, useRoute } from "@react-navigation/core";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  RadioButton,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import DisplayContainer from "../components/DisplayContainer";
import ReusableButton from "../components/ReusableButton";
import { UserLoginContex } from "../context/UserDataContext";
import { db, mainCollection, postCollection } from "../firebase/credentials";
import getUserDataDB from "../firebase/functions/getUserDataDB";
import { updateExperienceOrPost } from "../firebase/functions/updateFunctions";
import theme from "../theme";

const { text, colors } = theme;

const PostForm = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserLoginContex);
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      timeJob: route.params ? route.params.timeJob : "",
      mode: route.params ? route.params.mode : "",
      roleWanted: route.params ? route.params.roleWanted : "",
      country: route.params ? route.params.country : "",
      seniority: route.params ? route.params.seniority : "",
      english: route.params ? route.params.english : "",
      education: route.params ? route.params.education : "",
      experience: route.params ? route.params.experience : "",
      requirements: route.params ? route.params.requirements : "",
      functions: route.params ? route.params.functions : "",
      hourHand: route.params ? route.params.hourHand : "",
      contract: route.params ? route.params.contract : "",
      salary: route.params ? route.params.salary : "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const post = {
        ...values,
        userId: userData.id,
        userName: userData.userName,
        image: userData.image,
      };
      try {
        route.params
          ? await updateExperienceOrPost(
              post,
              userData.id,
              route.params.id,
              false
            )
          : await setPostToDb(post);
        const res = await getUserDataDB(userData.id);

        if (res) {
          setUserData(res);
          navigation.navigate("Perfil");
        } else {
          console.log(
            "ocurrio un error al crear el puesto, intentelo de nuevo"
          );
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function setPostToDb(post) {
    try {
      const newPost = doc(collection(db, mainCollection, userData.id, "posts"));
      const postToCollection = doc(collection(db, postCollection));

      await setDoc(postToCollection, {
        ...post,
        id: postToCollection.id,
        timestamp: serverTimestamp(),
      });
      await setDoc(newPost, {
        ...post,
        id: newPost.id,
        idPost: postToCollection.id,
        timestamp: serverTimestamp(),
      });

      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return (
    <DisplayContainer style={{ justifyContent: "flex-start" }}>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
              Puesto
            </Text>
            <TextInput
              mode="outlined"
              label="Puesto"
              style={styles.textInput}
              value={formik.values.roleWanted}
              onChangeText={formik.handleChange("roleWanted")}
              activeOutlineColor={`${colors.secondary}`}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
              País
            </Text>
            <TextInput
              mode="outlined"
              label="País"
              style={styles.textInput}
              value={formik.values.country}
              onChangeText={formik.handleChange("country")}
              activeOutlineColor={`${colors.secondary}`}
            />
          </View>

          {/* Primera fila de radios */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <View style={{ marginBottom: 10, width: "60%" }}>
              <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
                Seniority / Experiencia
              </Text>
              <RadioButton.Group
                onValueChange={formik.handleChange("seniority")}
                value={formik.values.seniority}
              >
                <View style={styles.radioButton}>
                  <RadioButton value="Junior" color={`${colors.details}`} />
                  <Text>Junior (hasta 2 años)</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton
                    value="Semi-Senior"
                    color={`${colors.details}`}
                  />
                  <Text>Semi-Senior (2 a 5 años)</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="Senior" color={`${colors.details}`} />
                  <Text>Senior (+5 años)</Text>
                </View>
              </RadioButton.Group>
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
                Modalidad
              </Text>
              <RadioButton.Group
                onValueChange={formik.handleChange("mode")}
                value={formik.values.mode}
              >
                <View style={styles.radioButton}>
                  <RadioButton value="Remoto" color={`${colors.details}`} />
                  <Text>Remoto</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="Híbrido" color={`${colors.details}`} />
                  <Text>Híbrido</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="Presencial" color={`${colors.details}`} />
                  <Text>Presencial</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          {/* Segunda fila de radios */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <View style={{ marginVertical: 10, width: "60%" }}>
              <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
                Tiempo
              </Text>
              <RadioButton.Group
                onValueChange={formik.handleChange("timeJob")}
                value={formik.values.timeJob}
              >
                <View style={styles.radioButton}>
                  <RadioButton value="Full-time" color={`${colors.details}`} />
                  <Text>Full-time</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="Part-time" color={`${colors.details}`} />
                  <Text>Part-time</Text>
                </View>
              </RadioButton.Group>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
                Inglés
              </Text>
              <RadioButton.Group
                onValueChange={formik.handleChange("english")}
                value={formik.values.english}
              >
                <View style={styles.radioButton}>
                  <RadioButton value={"false"} color={`${colors.details}`} />
                  <Text>No</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value={"true"} color={`${colors.details}`} />
                  <Text>Si</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          {/* Campos para completar la descripcion */}

          <View style={{ marginBottom: 10 }}>
            <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
              Formación / Título
            </Text>
            <TextInput
              mode="outlined"
              label="Formación - Título"
              style={{ height: 75, width: "100%", backgroundColor: "#fff" }}
              multiline={true}
              numberOfLines={3}
              value={formik.values.education}
              onChangeText={formik.handleChange("education")}
              activeOutlineColor={`${colors.secondary}`}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
              Experiencia
            </Text>
            <TextInput
              mode="outlined"
              label="Experiencia"
              style={{ height: 75, width: "100%", backgroundColor: "#fff" }}
              multiline={true}
              numberOfLines={3}
              value={formik.values.experience}
              onChangeText={formik.handleChange("experience")}
              activeOutlineColor={`${colors.secondary}`}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
              Requisitos
            </Text>
            <TextInput
              mode="outlined"
              label="Requisitos"
              style={{ height: 150, width: "100%", backgroundColor: "#fff" }}
              multiline={true}
              numberOfLines={6}
              value={formik.values.requirements}
              onChangeText={formik.handleChange("requirements")}
              activeOutlineColor={`${colors.secondary}`}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
              Funciones
            </Text>
            <TextInput
              mode="outlined"
              label="Funciones"
              style={{ height: 150, width: "100%", backgroundColor: "#fff" }}
              multiline={true}
              numberOfLines={6}
              value={formik.values.functions}
              onChangeText={formik.handleChange("functions")}
              activeOutlineColor={`${colors.secondary}`}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
              Horario laboral
            </Text>
            <TextInput
              mode="outlined"
              label="Horario"
              style={{ height: 75, width: "100%", backgroundColor: "#fff" }}
              multiline={true}
              numberOfLines={3}
              value={formik.values.hourHand}
              onChangeText={formik.handleChange("hourHand")}
              activeOutlineColor={`${colors.secondary}`}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
              Tipo de contrato
            </Text>
            <TextInput
              mode="outlined"
              label="Contrato"
              style={{ height: 50, width: "100%", backgroundColor: "#fff" }}
              value={formik.values.contract}
              onChangeText={formik.handleChange("contract")}
              activeOutlineColor={`${colors.secondary}`}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={[text.descriptionSubtitle, { marginBottom: 0 }]}>
              Rango salarial
            </Text>
            <TextInput
              mode="outlined"
              label="Rango salarial"
              style={{ height: 50, width: "100%", backgroundColor: "#fff" }}
              value={formik.values.salary}
              onChangeText={formik.handleChange("salary")}
              activeOutlineColor={`${colors.secondary}`}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingVertical: 16 }}>
        {loading ? (
          <ActivityIndicator color={colors.details} size={100} />
        ) : (
          <>
            <ReusableButton
              innerText="Publicar empleo"
              onPress={formik.handleSubmit}
              styleContainer={{ height: 50 }}
            />
            <ReusableButton
              innerText="Cancelar"
              onPress={() => navigation.goBack()}
              styleContainer={{ height: 50 }}
            />
          </>
        )}
      </View>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textInput: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default PostForm;
