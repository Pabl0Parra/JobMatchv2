import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import ActionsButtons from "../components/ActionsButtons";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Details = () => {
  const [description, setDescription] = useState();

  const descriptionData = {
    about: { title: "About", text: "descripcion sobre el usuario" },
    experience: {
      title: "Experience",
      text: "desripcion sobre la experiencia del usuario",
    },
    education: {
      title: "Education",
      text: "descripcion sobre su educacion y cursos",
    },
  };
  useEffect(() => {
    setDescription(descriptionData.about);
  }, []);

  return (
    <View style={styles.container}>
      {/* screen */}
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
        }}
        style={styles.image}
      />
      {/* card detalles */}
      <View style={styles.detailsContainer}>
        {/* botonera */}
        <View style={styles.detailsSectionsContainer}>
          <TouchableOpacity
            style={styles.detailsSection}
            onPress={() => setDescription(descriptionData.about)}
          >
            <AntDesign name="user" size={24} color="black" />
            <Text>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailsSection}
            onPress={() => setDescription(descriptionData.experience)}
          >
            <MaterialIcons name="work-outline" size={24} color="black" />
            <Text>Experience</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailsSection}
            onPress={() => setDescription(descriptionData.education)}
          >
            <Ionicons name="school-outline" size={24} color="black" />
            <Text>Education and courses</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.detailsDescription}>
          <Text style={styles.descriptionTitle}>{description?.title}</Text>
          <Text>{description?.text}</Text>
        </ScrollView>
        <ActionsButtons />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
  },
  image: {
    width: "100%",
    height: "50%",
    aspectRatio: "2/3",
  },
  detailsContainer: {
    height: "60%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "lightblue",
    alignItems: "center",
    zIndex: 2,
  },
  detailsSectionsContainer: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  detailsSection: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
    padding: 10,
  },
  detailsDescription: {
    width: "90%",
    height: 100,
    /* backgroundColor:"yellow", */
    padding: 15,
  },
  descriptionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
});

export default Details;
