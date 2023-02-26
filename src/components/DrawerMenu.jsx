import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DisplayContainer from "./DisplayContainer";
import Constants from "expo-constants";
import {
  AntDesign,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import theme from "../theme";
import ProfileDrawerItem from "./ProfileDrawerItem";
import logOut from "../firebase/functions/logOut";
import { useContext } from "react";
import { UserLoginContex } from "../context/UserDataContext";

const { colors, text } = theme;

const DrawerMenu = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserLoginContex);

  return (
    <DisplayContainer style={[styles.displayContainer]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowleft}
          onPress={(e) => navigation.closeDrawer()}
        >
          <AntDesign name="arrowleft" size={32} color={colors.secondary} />
        </TouchableOpacity>
        <Text
          style={[
            text.descriptionTitle,
            { color: colors.secondary, marginLeft: 20 },
          ]}
        >
          Configuración
        </Text>
      </View>
      <View style={styles.itemsContainer}>
        <ProfileDrawerItem textItem={"Notificaciones"}>
          <FontAwesome5 name="bell" size={24} color={colors.secondary} />
        </ProfileDrawerItem>
        <View style={styles.divider} />
        <ProfileDrawerItem textItem={"Cambiar modo"}>
          <MaterialCommunityIcons
            name="head-cog-outline"
            size={24}
            color={colors.secondary}
          />
        </ProfileDrawerItem>
        <View style={styles.divider} />
        <ProfileDrawerItem textItem={"Preferencias generales"}>
          <AntDesign name="profile" size={24} color={colors.secondary} />
        </ProfileDrawerItem>
        <View style={styles.divider} />
        <ProfileDrawerItem textItem={"Editar presentación"}>
          <AntDesign name="form" size={24} color={colors.secondary} />
        </ProfileDrawerItem>
        <View style={styles.divider} />
        <ProfileDrawerItem textItem={"Ayuda y soporte técnico"}>
          <AntDesign
            name="questioncircleo"
            size={24}
            color={colors.secondary}
          />
        </ProfileDrawerItem>
        <View style={styles.divider} />
        <ProfileDrawerItem
          textItem={"Cerrar sesión"}
          onPress={() => {
            logOut();
            setUserData(null);
          }}
        >
          <Feather name="log-out" size={24} color={colors.secondary} />
        </ProfileDrawerItem>
      </View>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    paddingTop: Constants.statusBarHeight + 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 50,
    width: "100%",
    paddingLeft: 18,
    borderBottomColor: "#D7D8D9",
    borderBottomWidth: 5,
  },
  itemsContainer: {
    position: "relative",
    width: "100%",
    paddingTop: 15,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#D7D8D9",
  },
});

export default DrawerMenu;
