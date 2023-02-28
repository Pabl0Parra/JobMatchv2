import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../theme";
import ExperienceCard from "./ExperienceCard";
import JobCard from "./JobCard";
import { useNavigation } from "@react-navigation/native";

const { text, colors } = theme;

const ProfileCards = ({worker, dataCards}) => {

  const navigation = useNavigation()

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
        <Text style={[text.text16, { fontWeight: "bold" }]}>{worker? "Experiencia" : "Puestos Vacantes"}</Text>
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
            onPress={() => navigation.navigate(worker ? "PostForm" : "PostForm")}
          />
        </TouchableOpacity>
      </View>
      {worker? (
        <ExperienceCard
          experienceData={{
            title: "probandos",
            description: "esto es una description",
          }}
        />
      ) : 
      (<JobCard
        jobData={{
          rol: "Desarrollador web",
          position: "front-end developer",
          seniority: "senior",
          country: "Argentina",
        }}
      />)}
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
