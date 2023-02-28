import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import theme from "../theme";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";

const { text, colors } = theme;

const ExperienceCard = ({ experienceData }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

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
          <Text style={[text.descriptionSubtitle, { flex: 1 }]}>
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
                navigation.navigate("ExperiencieForm", experienceData
                );
              }}
            >
              Editar
            </MenuItem>
            <MenuItem onPress={hideMenu}>Eliminar</MenuItem>
          </Menu>
        </View>
        <Text>{experienceData.description}</Text>
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
