import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import Header from "../components/Header";
import logOut from "../firebase/functions/logOut";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
  EvilIcons,
  FontAwesome5,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { useState, useContext } from "react";
import { Switch } from "react-native-paper";
import CircularProgress from "../components/CircularProgress";
import { UserLoginContex } from "../context/UserDataContext";
import DisplayContainer from "../components/DisplayContainer";
import theme from "../theme";

const { text, colors } = theme;

const Profile = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [percentage, setPercentage] = useState(60);
  const { userData } = useContext(UserLoginContex);

  return (
    <DisplayContainer style={styles.container}>
      <Header screen="Profile" />
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 80 }}
      >
        <View style={styles.profileHeader}>
          <Image
            style={styles.blueBackground}
            source={require("../images/profileBlueBG.png")}
          />
          <View>
            <Octicons
              style={styles.editProfileButton}
              name="pencil"
              size={24}
              color="#84FFFF"
            />
            <View
              style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                percent={percentage}
                radius={80}
                bgRingWidth={38}
                progressRingWidth={16}
                ringColor={"#091D5C"}
                ringBgColor={"#D7E0E9"}
              />
              <Image
                source={{
                  uri: "https://i.pinimg.com/originals/4d/da/aa/4ddaaa0463c649b9969c929638573593.png",
                }}
                style={styles.image}
              />
            </View>
          </View>
          <Text style={[styles.text, { marginVertical: 20 }]}>
            {percentage}% completado
          </Text>
          <Text
            style={[styles.text, { fontSize: 26, fontWeight: "600" }]}
          >{`${userData.userName} ${userData.userLastName}`}</Text>
          <Text style={[styles.text]}>{userData.userRole}</Text>
        </View>
        <View style={styles.detailsSectionsContainer}>
          <TouchableOpacity style={styles.detailsSection} onPress={() => {}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="bell" size={24} color={colors.secondary} />
              <Text
                style={[
                  text.subtitleMedium,
                  { color: colors.secondary, fontWeight: "900", marginLeft: 3 },
                ]}
              >
                5
              </Text>
            </View>
            <Text style={[text.descriptionItem, { color: colors.secondary }]}>
              Notificaciones
            </Text>
          </TouchableOpacity>
          <View style={styles.separatorDetails} />
          <TouchableOpacity style={styles.detailsSection} onPress={() => {}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="md-eye-outline"
                size={28}
                color={colors.secondary}
              />
              <Text
                style={[
                  text.subtitleMedium,
                  { color: colors.secondary, fontWeight: "900", marginLeft: 3 },
                ]}
              >
                5
              </Text>
            </View>
            <Text style={[text.descriptionItem, { color: colors.secondary }]}>
              Vistas
            </Text>
          </TouchableOpacity>
          <View style={styles.separatorDetails} />
          <TouchableOpacity style={styles.detailsSection} onPress={() => {}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="md-bookmark-outline"
                size={24}
                color={colors.secondary}
              />
              <Text
                style={[
                  text.subtitleMedium,
                  { color: colors.secondary, fontWeight: "900", marginLeft: 3 },
                ]}
              >
                5
              </Text>
            </View>
            <Text style={[text.descriptionItem, { color: colors.secondary }]}>
              Guardados
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.aboutMe}>
          <Text style={[text.descriptionSubtitle, { fontSize: 20 }]}>
            Acerca de mi
          </Text>
          <Text style={[text.descriptionItem, { fontWeight: "300" }]}>
            Yorem ipsum dolor sit amet, consectetur adipenaeos. Prae lorem.
            Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.
          </Text>
        </View>
        <View style={styles.containerSectionExperience}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[text.descriptionSubtitle, { marginBottom: 10 }]}>
              Experiencia
            </Text>
            <View style={{marginRight: 10, flexDirection: "row"}}>
              <FontAwesome style={{marginRight: 10}} name="plus" size={28} color="black" />
              <Octicons
              name="pencil"
              size={28}
              color={colors.secondary}
            />
            </View>
          </View>
          <View style={styles.experienceCard}>
            <View style={styles.experienceIcon}>
              <FontAwesome5 name="building" size={24} color="white" />
            </View>
            <View style={styles.textCardExperience}>
              <Text style={[text.descriptionSubtitle, { marginBottom: 2 }]}>
                Líder talento Humano
              </Text>
              <Text>
                Super de bebidas - Jornada completa Jun. 2013 - abr. 2022 - 8
                años 11 meses Chile, Santiago{" "}
              </Text>
            </View>
          </View>
        </View>

        {/* <View
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
        {
          // switcher
        }
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        {
          // end switcher
        }
      </View>
      <Button title="cerrar sesión" onPress={() => logOut()} /> */}
      </ScrollView>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    justifyContent: "flex-start",
  },
  blueBackground: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  profileHeader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 45,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 75,
    zIndex: 2,
    position: "absolute",
  },
  editProfileButton: {
    position: "absolute",
    zIndex: 3,
    bottom: 0,
    right: -15,
    width: 48,
    height: 48,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 40,
    backgroundColor: "#091D5C",
  },
  text: {
    fontSize: 16,
    color: "#525252",
    fontWeight: "400",
  },
  detailsSectionsContainer: {
    width: "100%",
    height: 90,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  detailsSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  separatorDetails: {
    width: 1,
    height: "70%",
    backgroundColor: "gray",
  },
  aboutMe: {
    paddingHorizontal: 26,
  },
  containerSectionExperience: {
    position: "relative",
    marginTop: 20,
    width: "85%",
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#aaa",
  },
  experienceCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 4,
  },
  experienceIcon: {
    padding: 10,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#091D5C",
    alignItems: "center",
    justifyContent: "center",
  },
  textCardExperience: {
    flex: 1,
  },
});

export default Profile;
