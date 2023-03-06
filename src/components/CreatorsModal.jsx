import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
// import axios from "axios";
import theme from "../theme";

const { colors } = theme;

const CreatorsModal = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  //   const [members, setMembers] = useState([]);

  // Se usa mientras el repo no este publicado
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  // Para traer los datos de los miembros del equipo cuando este publicado el repo
  //   useEffect(() => {
  //     axios
  //       .get("api.github/cuando sea publico el repo reemplazar por la url")
  //       .then((response) => {
  //         setMembers(response.data);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setIsLoading(false);
  //       });
  //   }, []);

  const members = [
    {
      id: 1,
      memberName: "Yesenia Moreno",
      memberRole: "UX/UI Designer",
      memberGithub: "",
      memberLinkedin: "",
      memberImage: "",
    },
    {
      id: 2,
      memberName: "Tatiana Montoya",
      memberRole: "QA",
      memberGithub: "",
      memberLinkedin: "",
      memberImage: "",
    },
    {
      id: 3,
      memberName: "Nicolás Radin",
      memberRole: "Frontend Developer",
      memberGithub: "https://github.com/niicodeer",
      memberLinkedin: "",
      memberImage: "",
    },
    {
      id: 4,
      memberName: "Nicolás Sepertino",
      memberRole: "Frontend Developer",
      memberGithub: "https://github.com/NicoSeper89",
      memberLinkedin: "",
      memberImage: "",
    },
    {
      id: 5,
      memberName: "Pablo Parra",
      memberRole: "Frontend Developer",
      memberGithub: "",
      memberLinkedin: "",
      memberImage: "",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.title}>Contacto:</Text>
            <FlatList
              data={members}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Feather name="user" size={24} color={colors.text} />
                  <View>
                    <Text style={styles.name}>{item.memberName}</Text>
                    <Text style={styles.role}>{item.memberRole}</Text>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => closeModal()}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default CreatorsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
  contentContainer: {
    width: "80%",
  },
  title: {
    color: `${colors.text}`,
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
    alignSelf: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imageContainer: {
    marginRight: 10,
  },
  name: {
    color: `${colors.text}`,
    fontSize: 30,
    fontWeight: "500",
  },
  role: {
    color: `${colors.text}`,
    fontSize: 18,
    fontWeight: "400",
  },
  button: {
    backgroundColor: `${colors.secondary}`,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonText: {
    color: `${colors.details}`,
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },
});
