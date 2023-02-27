import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import theme from "../theme";
import { Octicons } from "@expo/vector-icons";

const { colors, text } = theme;

const AboutMe = ({ description }) => {
  return (
    <View style={styles.aboutMe}>
      <View style={styles.header}>
        <Text style={[text.descriptionSubtitle, { fontSize: 20 }]}>
          Acerca de mi
        </Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => console.log("allala")}
        >
          <Octicons name="pencil" size={24}  color={colors.secondary} />
        </TouchableOpacity>
      </View>
      <Text style={[text.descriptionItem, { fontWeight: "300" }]}>
        {description}
      </Text>
    </View>
  );
};

export default AboutMe;

const styles = StyleSheet.create({
  aboutMe: {
    position: "relative",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginLeft: 25,
    width: "73%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  editButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
