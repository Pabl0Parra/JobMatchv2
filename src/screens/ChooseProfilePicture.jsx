import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DisplayContainer from "../components/DisplayContainer";

const ChooseProfilePicture = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      // Research uri --> https://docs.expo.io/versions/latest/sdk/imagepicker/#imagepickerlaunchimagelibraryasync
      // access selected assets through the "assets" array instead (warning in console)
      setImage(result.uri);
    }
  };

  const changeImage = async () => {
    pickImage();
  };

  return (
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
        <TouchableOpacity style={styles.changeImage}>
          <Text style={styles.changeImageText} onPress={changeImage}>
            Cambiar foto
          </Text>
        </TouchableOpacity>
      ) : null}
      {/* hay que hacer que el botón de finalizar solo se active cuando se haya seleccionado una foto, 
       hay que hacer que el proceso de registro acabe aquí --> mover register() a este componente*/}
      <TouchableOpacity style={styles.finished}>
        <Text style={styles.finishedText}>Finalizar</Text>
      </TouchableOpacity>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "start",
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
    marginTop: 160,
  },
  finishedText: {
    fontSize: 16,
  },
});

export default ChooseProfilePicture;
