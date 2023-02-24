import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import DisplayContainer from "../components/DisplayContainer";
import { UserDataContext } from "../context/UserDataContext";
import registerUser from "../firebase/functions/registerUser";
import uploadProfilePicture from "../firebase/functions/uploadProfilePicture";
import { MaterialIcons } from "@expo/vector-icons";
import ProfilePicture from "../svgs/ProfilePicture";

import { useNavigation } from "@react-navigation/core";

import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";
import ReusableButton from "../components/ReusableButton";

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
      <View style={styles.bgContainer}>
        <ProfilePicture />
      </View>
      <DisplayContainer style={{ justifyContent: "flex-start", marginTop: 4 }}>
        <Text style={styles.title}>Añadir foto</Text>
        <Text style={styles.subTitle}>
          Sabías que añadir una foto incrementa en un 70% tus opciones de match?
        </Text>
        <View style={styles.imageContainer}>
          <View style={styles.rectangle}>
            {image ? (
              <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pickImage} style={styles.addImage}>
                <Text style={styles.addImageText}>+</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialIcons name="photo-camera" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        {image ? (
          <TouchableOpacity style={styles.changeImage} onPress={changeImage}>
            <Text style={styles.changeImageText}>Cambiar foto</Text>
          </TouchableOpacity>
        ) : null}
        <ReusableButton
          innerText="Finalizar"
          onPress={() => {uploadImages}} />
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
  bgContainer: {
    alignItems: "left",
    marginTop: 20,
  },
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
