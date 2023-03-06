import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RegisterProgressBar from "../components/RegisterProgressBar";
import { useNavigation } from "@react-navigation/native";
import ManLikes from "../svgs/ManLikes";
import theme from "../theme";
import Constants from "expo-constants";
import { updateFisrTime } from "../firebase/functions/updateFunctions";
import { UserLoginContex } from "../context/UserDataContext";

const colors = theme;

const Onboarding1 = () => {
  const navigation = useNavigation();
  const {userData} = useContext(UserLoginContex)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.omitirButton}
          onPress={() => {navigation.navigate("Main")
          updateFisrTime(userData.id)}}
        >
          <Text style={styles.omitirText}>Omitir</Text>
        </TouchableOpacity>
        <ManLikes style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Empieza haciendo las mejores conexiones laborales
          </Text>
          <Text style={styles.subtitle}>
            Desliza a la derecha con los que quieras conectar y has match. Los
            que no te interesen deslizalos a la izquierda.
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <RegisterProgressBar currentStep={1} numSteps={4} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Onboarding2")}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  imageContainer: {
    marginTop: Constants.statusBarHeight,
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  omitirButton: {
    position: "absolute",
    top: 20,
    right: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 1,
  },
  omitirText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#84FFFF",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleContainer: {
    justifyContent: "center",
    flex: 1,
    lineHeight: 20,
  },
  title: {
    fontSize: 20,
    color: "#525252",
    fontWeight: "500",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#525252",
    fontWeight: "500",
  },
  progressContainer: {
    width: "100%",
    marginBottom: 40,
  },
  button: {
    width: 280,
    height: 38,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#091D5C",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: `${colors.secondary}`,

    fontSize: 14,
    fontWeight: "500",
  },
});

export default Onboarding1;