import React, { useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { UserDataContext } from "../context/UserDataContext";
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
      <SafeAreaView>
        <BackButton text="Crear cuenta" />
        <RegisterProgressBar currentStep={1} numSteps={5} />
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
          <View style={styles.workerContainer}>
            <View style={styles.titleSubtitle}>
              <Text style={styles.title}>En busca de empleo</Text>
              <Text style={styles.subtitle}>Impulsa tu vida profesional</Text>
            </View>
            <View style={styles.radioContainer}>
              <View style={styles.radioWrapper}>
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
          </View>
          <View style={styles.employerContainer}>
            <View style={styles.titleSubtitle}>
              <Text style={styles.title}>Buscando personal</Text>
              <Text style={styles.subtitle}>Consigue nuevos colaboradores</Text>
            </View>
            <View style={styles.radioContainer}>
              <View style={styles.radioWrapper}>
                <RadioButton
                  value="employer"
                  status={
                    selectedValue === "employer" ? "checked" : "unchecked"
                  }
                  onPress={(type) => {
                    setUserData({ ...userData, worker: false, employer: true }),
                      setSelectedValue("employer");
                  }}
                />
              </View>
            </View>
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
      </SafeAreaView>
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
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 14,
    color: "#525252",
  },
  workerContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#ccc",
    padding: 10,
  },
  titleSubtitle: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  employerContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#ccc",
    padding: 10,
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
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  radioWrapper: {
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
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
