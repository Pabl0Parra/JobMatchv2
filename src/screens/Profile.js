import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Header from "../components/Header";
import logOut from "../firebase/functions/logOut";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Switch } from "react-native-paper";
import CircularProgress from "../components/CircularProgress";

const Profile = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [percentage, setPercentage] = useState(60);

  return (
    <View style={styles.container}>
      <Header screen="Profile" />
      <View style={styles.profileHeader}>
        <Text style={styles.profile}>Profile</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <CircularProgress
            percent={percentage}
            radius={80}
            bgRingWidth={16}
            progressRingWidth={16}
            ringColor={"red"}
            ringBgColor={"#ccc"}
          />
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
            }}
            style={styles.image}
          />
        </View>
        <Text style={{marginVertical:10}}>Perfil {percentage}% completado</Text>
      </View>
      <View style={styles.profileUser}>
        <Text style={styles.profileUserName}>Nombre</Text>
        <Text style={styles.profileUserRol}>Profesion</Text>
      </View>
      <View style={styles.detailsSectionsContainer}>
        <TouchableOpacity style={styles.detailsSection} onPress={() => {}}>
          <AntDesign name="user" size={24} color="black" />
          <Text>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsSection} onPress={() => {}}>
          <MaterialIcons name="work-outline" size={24} color="black" />
          <Text>Experience</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsSection} onPress={() => {}}>
          <Ionicons name="school-outline" size={24} color="black" />
          <Text>Education and courses</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          width: "80%",
          justifyContent: "flex-start",
          margin: 25,
        }}
      >
        <Text>En busca de empleo:</Text>
        {/* switcher */}
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        {/* end switcher */}
      </View>
      <Button title="cerrar sesión" onPress={() => logOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
  },
  profileHeader: {
    backgroundColor: "lightgreen",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    zIndex: 2,
    position: "absolute",
  },
  profile: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    margin: 15,
  },
  profileUser: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profileUserName: {
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  profileUserRol: {
    marginVertical: 10,
    fontSize: 18,
  },
  detailsSectionsContainer: {
    width: "100%",
    height: 100,
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
    backgroundColor: "lightgreen",
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

export default Profile;
