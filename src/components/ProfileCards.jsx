import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../theme";
import ExperienceCard from "./ExperienceCard";
import JobCard from "./JobCard";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useContext } from "react";
import { UserLoginContex } from "../context/UserDataContext";

const { text, colors } = theme;

const ProfileCards = ({ worker, dataCards }) => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserLoginContex);

  const cardsMap = () => {

    if (dataCards === undefined) {return null}

    if (worker) {
     return dataCards.map((exp) => (
        <ExperienceCard
          key={exp.id}
          experienceData={{
            title: exp.position,
            description: exp.description,
          }}
        />
      ))
         } else {
      return (<JobCard
        jobData={{
          rol: "Desarrollador web",
          position: "front-end developer",
          seniority: "senior",
          country: "Argentina",
        }}
      />)
    }}

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
          {worker ? "Experiencia" : "Puestos Vacantes"}
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
              navigation.navigate(worker ? "ExperiencieForm" : "PostForm")
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
