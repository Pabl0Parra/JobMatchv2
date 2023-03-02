import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import theme from "../theme";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import getUserDataDB from "../firebase/functions/getUserDataDB";
import deleteExperienceOrPost from "../firebase/functions/deleteExperienceOrPost";
import { UserLoginContex } from "../context/UserDataContext";

const { text, colors } = theme;

const JobCard = ({ postData }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const { setUserData } = useContext(UserLoginContex);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  console.log(postData);
  return (
    <View style={styles.jobCard}>
      <View style={styles.experienceIcon}>
        <FontAwesome5 name="building" size={24} color="white" />
      </View>
      <View style={styles.textCardExperience}>
        <View
          style={{
            paddingRight: 3,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={[text.descriptionSubtitle, { flex: 1, fontSize: 18 }]}>
            {postData.roleWanted}
          </Text>
          <Menu
            visible={visible}
            anchor={
              <Ionicons
                style={{ flex: 1 }}
                name="md-ellipsis-horizontal-sharp"
                size={24}
                color={colors.secondary}
                onPress={showMenu}
              />
            }
            onRequestClose={hideMenu}
          >
            <MenuItem
              onPress={() => {
                hideMenu();
                navigation.navigate("PostForm", postData);
              }}
            >
              Editar
            </MenuItem>
            <MenuItem
              onPress={async () => {
                hideMenu();
                try {
                  await deleteExperienceOrPost(
                    postData.userId,
                    postData.id,
                    false
                  );
                  const res = await getUserDataDB(postData.userId);

                  if (res) {
                    setUserData(res);
                  } else {
                    console.log("error al obtener los datos");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Eliminar
            </MenuItem>
          </Menu>
        </View>
        <Text
          style={[
            text.text14,
            {
              flex: 1,
              fontStyle: "italic",
              fontWeight: "600",
              color: colors.text,
              marginBottom: 4,
            },
          ]}
        >
          {postData.country}
        </Text>
        <Text
          style={[
            text.text14,
            {
              flex: 1,
              fontStyle: "italic",
              fontWeight: "400",
              color: colors.text,
              marginBottom: 4,
            },
          ]}
        >
          {postData.seniority + " " + postData.timeJob}
        </Text>
        <Text style={[text.text16, { flex: 1, fontWeight: "600" }]}>
          {postData.requirements}
        </Text>
      </View>
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  jobCard: {
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
