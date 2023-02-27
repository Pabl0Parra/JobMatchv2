import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RegisterProgressBar from "../components/RegisterProgressBar";
import { useNavigation } from "@react-navigation/native";
import ManCheckingProfile from "../svgs/ManCheckingProfile";

const Onboarding4 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.omitirButton}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.omitirText}>Omitir</Text>
        </TouchableOpacity>
        <ManCheckingProfile style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Completa tu perfil</Text>
          <Text style={styles.subtitle}>
            Completa tu perfil al 100% para que seas uno de los más visibles y
            visitados.
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <RegisterProgressBar currentStep={4} numSteps={4} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 0,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    position: "relative",
    alignItems: "flex-end",
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
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  omitirText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#84FFFF",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    marginTop: 20,
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
    padding: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#091D5C",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#091D5C",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Onboarding4;
