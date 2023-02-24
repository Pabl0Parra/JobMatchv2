import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import DisplayContainer from "../components/DisplayContainer";
import { useNavigation } from "@react-navigation/native";
import { UserDataContext } from "../context/UserDataContext";
import ReusableButton from "../components/ReusableButton";
import RegisterProgressBar from "../components/RegisterProgressBar";
import BackButton from "../components/BackButton";
import ClickingHand from "../svgs/ClickingHand";
import theme from "../theme";

const { colors } = theme;

const ChooseUserType = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <>
      <BackButton text="Crear cuenta" />
      <RegisterProgressBar currentStep={1} />
      <ClickingHand />
      <View
        style={{
          alignItems: "flex-start",
          marginLeft: 19,
          marginRight: 24,
          marginTop: 20,
        }}
      >
        <Text style={styles.title}>Elige un modo para empezar</Text>
        <Text style={styles.subtitle}>
          ¡Jobmatch te permite hacer buenas conexiones laborales! Una vez esté
          listo tu perfil, podrás cambiar de un modo a otro.
        </Text>
        <View style={styles.optionsContainer}>
          <View style={styles.optionBox}>
            <View style={styles.radioContainer}>
              <Text style={styles.radioText}>En busca de empleo</Text>
              <Text style={styles.radioSubText}>
                Impulsa tu vida profesional
              </Text>
              <RadioButton
                value="worker"
                status={selectedValue === "worker" ? "checked" : "unchecked"}
                onPress={(type) => {
                  setUserData({ ...userData, worker: true, employer: false }),
                    setSelectedValue("worker");
                }}
              />
            </View>
          </View>
          <View style={styles.optionBox}>
            <View style={styles.radioContainer}>
              <Text style={styles.radioText}>Buscando personal</Text>
              <Text style={styles.radioSubText}>
                Consigue nuevos colaboradores
              </Text>
              <RadioButton
                value="employer"
                status={selectedValue === "employer" ? "checked" : "unchecked"}
                onPress={(type) => {
                  setUserData({ ...userData, employer: true, worker: false }),
                    setSelectedValue("employer");
                }}
              />
            </View>
          </View>
          {/* SE QUEDA AQUÍ POR SI DECIDIMOS IMPLEMENTAR EL TERCER TIPO DE USUARIO
         <View style={styles.optionBox}>
          <View style={styles.radioContainer}>
            <Text style={styles.radioText}>Abierto a crecer</Text>
            <RadioButton
              value="open to grow"
              status={
                selectedValue === "open to grow" ? "checked" : "unchecked"
              }
              onPress={() => setSelectedValue("open to grow")}
           
          </View>
        </View> /> */}
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: selectedValue
                ? `${colors.secondary}`
                : "#D9D9D9",
            },
          ]}
          onPress={() => {
            const navigateTo = {
              worker: "ChooseUserName",
              employer: "ChooseCompanyName",
              // "open to grow": "ChooseUserName",
            };
            navigation.navigate(navigateTo[selectedValue] || "");
          }}
          disabled={!selectedValue}
        >
          <Text
            style={[
              styles.buttonText,
              { color: selectedValue ? "#84FFFF" : "#666666" },
            ]}
          >
            Siguiente
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#525252",
    fontWeight: 500,
  },
  subtitle: {
    fontSize: 14,
    color: "#525252",
  },
  optionsContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  optionBox: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  radioContainer: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "gray",
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioText: {
    fontSize: 16,
    marginRight: 10,
  },
  radioSubText: {
    fontSize: 12,
  },
  button: {
    justifyContent: "center",
    width: 288,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    marginTop: 89,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default ChooseUserType;
