import React, { useState, useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import DisplayContainer from "../components/DisplayContainer";
import { UserDataContext } from "../context/UserDataContext";
import registerUser from "../firebase/functions/registerUser";
import uploadProfilePicture from "../firebase/functions/uploadProfilePicture";

import { useNavigation } from "@react-navigation/core";

import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";
import { async } from "q";

const ChooseProfilePicture = () => {
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.assets) {
      // Research uri --> https://docs.expo.io/versions/latest/sdk/imagepicker/#imagepickerlaunchimagelibraryasync
      // access selected assets through the "assets" array instead (warning in console)

      setImage(result.uri);
    }
  };

  const changeImage = async () => {
    pickImage();
  };

  const uploadImages = async () => {
    try {
      const res = await uploadProfilePicture(
        image,
        `profileImg${userData.email}`
      );
      console.log(res);
      /* setUserData({ ...userData, image: res.toString() }); */
      registerUser(userData.email, userData.password, {
        ...userData,
        image: res,
      });
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  // aquí se cierra la alerta y se navega a Home
  const hideAlert = () => {
    setShowAlert(false);
    navigation.navigate("Home");
  };

  return (
    <>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={5} />
      <DisplayContainer>
        <Text style={styles.title}>Añadir foto</Text>
        <Text style={styles.subTitle}>
          Sabías que añadir una foto incrementa en un 70% tus opciones de match?
        </Text>
        {image ? (
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.addImage}>
            <Text style={styles.addImageText}>+</Text>
          </TouchableOpacity>
        )}
        {image ? (
          <TouchableOpacity style={styles.changeImage} onPress={changeImage}>
            <Text style={styles.changeImageText}>Cambiar foto</Text>
          </TouchableOpacity>
        ) : null}
        {/* hay que hacer que el botón de finalizar solo se active cuando se haya seleccionado una foto, 
     hay que hacer que el proceso de createUser acabe aquí --> importar createUser() a este componente*/}
        <TouchableOpacity style={styles.finished} onPress={uploadImages}>
          <Text style={styles.finishedText}>Finalizar</Text>
        </TouchableOpacity>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Enhorabuena! 🎉"
          message="Te hemos mandado un correo de confirmación. ¡Ahora solo falta que confirmes tu cuenta!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={hideAlert}
        />
      </DisplayContainer>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "left",
  },
  subTitle: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  addImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  addImageText: {
    fontSize: 50,
  },
  changeImage: {
    width: 144,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  changeImageText: {
    fontSize: 14,
  },
  finished: {
    width: 288,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 100,
  },
  finishedText: {
    fontSize: 16,
  },
});

export default ChooseProfilePicture;
