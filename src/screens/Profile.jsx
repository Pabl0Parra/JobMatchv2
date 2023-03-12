import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import Header from "../components/Header";
import { Ionicons, Octicons, Feather } from "@expo/vector-icons";
import { useState, useContext, useEffect } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { UserLoginContex } from "../context/UserDataContext";
import DisplayContainer from "../components/DisplayContainer";
import theme from "../theme";
import { useIsFocused } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import changeURLProfilePictureDB from "../firebase/functions/changeURLProfilePictureDB";
import getUserDataDB from "../firebase/functions/getUserDataDB";
import AboutMe from "../components/AboutMe";
import ProfileCards from "../components/ProfileCards";
import { uploadProfilePicture } from "../firebase/functions/updateFunctions";

const { text, colors } = theme;

const Profile = () => {
  const { userData, setUserData, setTab } = useContext(UserLoginContex);
  const [setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [percentage, setPercentage] = useState(50);

  const isFocused = useIsFocused();
  const [savedCount, setSavedCount] = useState(0);
  const [visitsCount, setVisitsCount] = useState(0);
  const [loading, setLoading] = useState({
    image: false,
  });

  useEffect(() => {
    let porc = 50;

    userData.aboutme !== undefined &&
      userData.aboutme !== "" &&
      userData.aboutme !== null &&
      (porc = porc + 20);
    userData.image !==
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" &&
      (porc = porc + 20);
    if (userData.worker) {
      userData.experiences?.length && (porc = porc + 10);
    } else {
      userData.posts?.length && (porc = porc + 10);
    }

    setPercentage(porc);
  }, [userData]);

  const changeProfilePicture = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.assets) {
        setLoading({ ...loading, image: true });
        const urlPicture = await uploadProfilePicture(
          result.uri,
          `profileImg${userData.email}`
        );
        await changeURLProfilePictureDB(userData.id, urlPicture);

        const res = await getUserDataDB(userData.id);
        if (res) {
          setUserData(res);
        } else {
          console.log("error al obtener los datos");
        }
      }
      setLoading({ ...loading, image: false });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSavedCount(userData.savedCount);
    setVisitsCount(userData.visits);
    isFocused && setTab(4);
  }, [isFocused, savedCount, visitsCount]);

  return (
    <DisplayContainer style={[styles.container]}>
      <Header screen="Profile" />
      <ScrollView
        keyboardDismissMode={true}
        contentContainerStyle={{
          position: "relative",
          alignItems: "center",
          paddingBottom: 80,
        }}
      >
        <View style={styles.profileHeader}>
          <Image
            style={styles.blueBackground}
            source={require("../images/profileBlueBG.png")}
          />
          <View>
            <TouchableOpacity
              style={styles.editProfilePictureButton}
              onPress={changeProfilePicture}
            >
              <Octicons name="pencil" size={24} color="#84FFFF" />
            </TouchableOpacity>
            <View
              style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                value={percentage}
                radius={100}
                duration={2000}
                activeStrokeColor={"#2465FD"}
                activeStrokeSecondaryColor={"#C25AFF"}
                maxValue={100}
              />
              <View
                style={{
                  position: "absolute",
                  width: 180,
                  height: 180,
                  backgroundColor: "#D7E0E9",
                  borderRadius: 200,
                }}
              />
              {loading.image ? (
                <View
                  style={[
                    styles.image,
                    { alignItems: "center", justifyContent: "center" },
                  ]}
                >
                  <ActivityIndicator size={90} />
                </View>
              ) : (
                <Image
                  source={{
                    uri: userData?.image,
                  }}
                  style={[styles.image]}
                />
              )}
            </View>
          </View>
          <Text style={[styles.text, { marginVertical: 20 }]}>
            {percentage}% completado
          </Text>
          <Text style={[styles.text, { fontSize: 26, fontWeight: "600" }]}>{`${
            userData.userName
          } ${userData.userLastName ? userData.userLastName : ""}`}</Text>
          <Text style={[styles.text]}>
            {userData.worker ? userData.userRole : userData.sector}
          </Text>
        </View>
        <View style={styles.detailsSectionsContainer}>
          {/*           <TouchableOpacity style={styles.detailsSection} onPress={() => {}}>
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
          </TouchableOpacity> */}
          {/* <View style={styles.separatorDetails} /> */}
          <TouchableOpacity style={styles.detailsSection} onPress={() => {}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="md-eye-outline"
                size={28}
                color={colors.secondary}
              />
              <Text
                style={[
                  text.cardSubtitleMedium,
                  { color: colors.secondary, fontWeight: "900", marginLeft: 3 },
                ]}
              >
                {visitsCount}
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
                  text.cardSubtitleMedium,
                  { color: colors.secondary, fontWeight: "900", marginLeft: 3 },
                ]}
              >
                {savedCount}
              </Text>
            </View>
            <Text style={[text.descriptionItem, { color: colors.secondary }]}>
              Guardados
            </Text>
          </TouchableOpacity>
        </View>
        <AboutMe />
        <ProfileCards />
      </ScrollView>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    justifyContent: "center",
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
  editProfilePictureButton: {
    position: "absolute",
    zIndex: 3,
    bottom: 0,
    right: -15,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#091D5C",
    borderRadius: 40,
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
});

export default Profile;
