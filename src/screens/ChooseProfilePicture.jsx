import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import DisplayContainer from "../components/DisplayContainer";
import { UserDataContext } from "../context/UserDataContext";
import registerUser from "../firebase/functions/registerUser";
import uploadProfilePicture from "../firebase/functions/uploadProfilePicture";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfilePicture from "../svgs/ProfilePicture";
import { useNavigation } from "@react-navigation/core";
import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";
import ReusableButton from "../components/ReusableButton";
import theme from "../theme";

const colors = theme.colors;

const ChooseProfilePicture = () => {
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  const pickImage = async () => {
    setLoadingImage(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.assets) {
      setImage(result.uri);
      
    }
    setLoadingImage(false)
  };

  const changeImage = async () => {
    pickImage();
  };

  const uploadImages = async () => {
    try {setLoading(true)
      const res = await uploadProfilePicture(
        image,
        `profileImg${userData.email}`
      );
      console.log(res);
      if (res) {
        await registerUser(userData.email, userData.password, {
          ...userData,
          image: res,
        });
      } else {
        await registerUser(userData.email, userData.password, {
          ...userData,
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        });
      }
      setLoading(false)
      setShowAlert(true);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  const hideAlert = () => {
    setShowAlert(false);
    navigation.navigate("Main");
  };

  return (
    <View>
      {loading ? (
      <View style={styles.loading}>
        <ActivityIndicator size={130} />
      </View>
    ) : null}
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={5} numSteps={5} />
      <View style={styles.bgContainer}>
        <ProfilePicture />
      </View>
      <DisplayContainer
        style={{
          justifyContent: "flex-start",
          marginTop: 4,
          alignContents: "flex-start",
        }}
      >
        <View style={{ marginLeft: 6, marginRight: 24, marginTop: 11 }}>
          <Text style={styles.title}>Añadir foto</Text>
          <Text style={styles.subTitle}>
            Causa una buena impresión, sube una foto de plano medio.
          </Text>
        </View>
        <View>
          <View style={styles.rectangle}>
            {image ? (
              <TouchableOpacity onPress={pickImage}>
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
            ) : (
              loadingImage? 
                <ActivityIndicator size={50}/> 
                :
                <TouchableOpacity onPress={pickImage}>
                 <Text style={styles.addImageText}>+</Text>
                </TouchableOpacity>
            )}
          </View>
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={24}
                color={colors.details}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ReusableButton
          innerText="Finalizar"
          onPress={() => uploadImages()}
          styleContainer={{ marginTop: 60 }}
        />

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Enhorabuena! 🎉"
          message="Te hemos mandado un correo de confirmación. ¡Ahora solo falta que confirmes tu cuenta!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={colors.secondary}
          onConfirmPressed={() => hideAlert()}
        />
      </DisplayContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    alignItems: "flex-start",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
    color: `${colors.text}`,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "italic",
    marginBottom: 20,
    color: `${colors.text}`,
  },
  rectangle: {
    width: 192,
    height: 288,
    borderWidth: 1,
    borderColor: "#727272",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 42,
  },
  image: {
    width: 192,
    height: 288,
    borderRadius: 28,
  },
  cameraButtonContainer: {
    position: "absolute",
    bottom: -16,
    right: -20,
    backgroundColor: `${colors.secondary}`,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    zIndex: 1,
  },

  addImage: {
    width: 200,
    height: 200,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addImageText: {
    fontSize: 50,
    color: "#727272",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(20, 20, 20, .7)",
    zIndex: 2,
  },
});

export default ChooseProfilePicture;
