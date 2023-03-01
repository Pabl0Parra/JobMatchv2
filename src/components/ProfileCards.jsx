import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../theme";
import ExperienceCard from "./ExperienceCard";
import JobCard from "./JobCard";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserLoginContex } from "../context/UserDataContext";

const { text, colors } = theme;

const ProfileCards = () => {
  const navigation = useNavigation();
  const { userData } = useContext(UserLoginContex);

  const cardsMap = () => {
    if (userData[`${userData.worker? "experiences" : "posts"}`].length === 0) {
      return (
        <Text
          style={[
            text.text16,
            {
              textAlign: "center",
              fontWeight: "700",
              color: colors.secondary,
              padding: 3,
            },
          ]}
          onPress={() => navigation.navigate(userData.worker ? "ExperienceForm" : "PostForm")}
        >
          Agregar {userData.worker ? "Experiencias" : "Puestos vacantes"}
        </Text>
      );
    }

    if (userData.worker) {
      return userData.experiences.map((exp) => (
        <ExperienceCard key={exp.id} experienceData={exp} />
      ));
    } else {
      return userData.posts.map((post) => (
        <JobCard key={post.id} postData={post} />
      ));
      }
    };
    
    
    
  return (
    <View style={styles.containerSectionExperience}>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Text style={[text.text16, { fontWeight: "bold" }]}>
          {userData.worker ? "Experiencia" : "Puestos Vacantes"}
        </Text>
        <TouchableOpacity
          style={{
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome
            style={{ marginRight: 10 }}
            name="plus"
            size={28}
            color="black"
            onPress={() =>
              navigation.navigate(
                userData.worker ? "ExperienceForm" : "PostForm"
              )
            }
          />
        </TouchableOpacity>
      </View>
      {cardsMap()}
    </View>
  );
};

export default ProfileCards;

const styles = StyleSheet.create({
  containerSectionExperience: {
    position: "relative",
    marginTop: 20,
    width: "85%",
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#aaa",
  },
});
