import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import theme from "../theme";
import { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import deleteExperienceOrPost from "../firebase/functions/deleteExperienceOrPost";
import getUserDataDB from "../firebase/functions/getUserDataDB";
import { FocusedTab, UserLoginContex } from "../context/UserDataContext";

const { text, colors } = theme;

const ExperienceCard = ({ experienceData }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const { setUserData } = useContext(UserLoginContex);
  const {setTab}  =useContext(FocusedTab)
  const isFocused = useIsFocused()

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  useEffect(()=> {
    isFocused && setTab(4)
  
}, [isFocused]);

  return (
    <View style={styles.experienceCard}>
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
          <Text
            style={[
              text.descriptionTitle,
              { flex: 1, fontSize: 18, marginBottom: 0 },
            ]}
          >
            {experienceData.position}
          </Text>
          <Menu
            visible={visible}
            anchor={
              <Ionicons
                style={{ flex: 1 }}
                name="md-ellipsis-horizontal-sharp"
                size={24}
                color="black"
                onPress={showMenu}
              />
            }
            onRequestClose={hideMenu}
          >
            <MenuItem
              onPress={() => {
                hideMenu();
                navigation.navigate("ExperienceForm", experienceData);
              }}
            >
              Editar
            </MenuItem>
            <MenuItem
              onPress={async () => {
                hideMenu();
                try {
                  await deleteExperienceOrPost(
                    experienceData.userId,
                    experienceData.id,
                    true
                  );
                  const res = await getUserDataDB(experienceData.userId);

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
        <Text style={[text.text14, { flex: 1, fontStyle: "italic", fontWeight: "600", color: colors.text, marginBottom: 4 }]}>
          {experienceData.country}
        </Text>
        <Text style={[text.text14, { flex: 1, fontStyle: "italic", fontWeight: "400", color: colors.text, marginBottom: 4 }]}>
          {experienceData.period}
        </Text>
        <Text style={[text.text14, { flex: 1, fontWeight: "600" }]}>
          {experienceData.description}
        </Text>
      </View>
    </View>
  );
};

export default ExperienceCard;

const styles = StyleSheet.create({
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
