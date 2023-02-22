import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import DisplayContainer from "../components/DisplayContainer";
import { useNavigation } from "@react-navigation/native";
import { UserDataContext } from "../context/UserDataContext";
import ReusableButton from "../components/ReusableButton";


const ChooseUserType = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <DisplayContainer>
      <Text style={styles.title}>Elige un modo para empezar:</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.optionBox}>
          <View style={styles.radioContainer}>
            <Text style={styles.radioText}>En busca de empleo</Text>
            <RadioButton
              value="worker"
              status={selectedValue === "worker" ? "checked" : "unchecked"}
              onPress={(type) => {
                setUserData({ ...userData, [type]: "worker" }),
                  setSelectedValue("worker");
              }}
            />
          </View>
        </View>
        <View style={styles.optionBox}>
          <View style={styles.radioContainer}>
            <Text style={styles.radioText}>Buscando personal</Text>
            <RadioButton
              value="employer"
              status={selectedValue === "employer" ? "checked" : "unchecked"}
              onPress={(type) => {
                setUserData({ ...userData, [type]: "employer" }),
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
      <ReusableButton innerText="Siguiente"
      enabled={selectedValue}
      onPress={() => {
        const navigateTo = {
          worker: "ChooseUserName",
          employer: "ChooseCompanyName",
          // "open to grow": "ChooseUserName",
        };

        navigation.navigate(navigateTo[selectedValue] || "");
      }}/>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
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
    borderRadius: 5,
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
  button: {
    justifyContent: "center",
    width: 288,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    marginTop: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});

export default ChooseUserType;
