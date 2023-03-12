import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DisplayContainer from "./DisplayContainer";
import Constants from "expo-constants";
import { AntDesign, Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Switch } from "react-native-paper";

import theme from "../theme";
import ProfileDrawerItem from "./ProfileDrawerItem";
import CreatorsModal from "./CreatorsModal";
import logOut from "../firebase/functions/logOut";
import { useContext, useState } from "react";
import { UserLoginContex } from "../context/UserDataContext";
import MainDataEditingForm from "./MainDataEditingForm";
import ReusableButton from "./ReusableButton";
import getUserDataDB from "../firebase/functions/getUserDataDB";
import { updateDataUser } from "../firebase/functions/updateFunctions";

const { colors, text } = theme;

const DrawerMenu = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserLoginContex);
  const [showModeModal, setShowModeModal] = useState(false);
  const [showModalPresentation, setShowModalPresentation] = useState(false);
  const [showCreatorsModal, setShowCreatorsModal] = useState(false);
  const [userMode, setUserMode] = useState(userData.available);
  const [loading, setLoading] = useState(false);

  const changeMode = async () => {
    if (userMode !== userData.available) {
      setLoading(true);
      try {
        await updateDataUser(
          { available: userMode },
          userData.worker ? userData.id : userData.userId
        );
        const res = await getUserDataDB(
          userData.worker ? userData.id : userData.userId
        );

        if (res) {
          setUserData(res);
        } else {
          console.log("error al cargar los datos");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setShowModeModal(false);
    setLoading(false);
  };

  const closeCreatorsModal = () => {
    setShowCreatorsModal(false);
  };

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
        <ProfileDrawerItem
          textItem={"Editar presentación"}
          onPress={(e) => {
            setShowModalPresentation(true);
          }}
        >
          <AntDesign name="form" size={24} color={colors.secondary} />
        </ProfileDrawerItem>
        <MainDataEditingForm
          setShowModal={setShowModalPresentation}
          showModal={showModalPresentation}
          inputArray={
            !userData.worker
              ? [
                  { name: "userName", title: "Nombre" },
                  { name: "roleWanted", title: "Rol" },
                  { name: "sector", title: "Sector" },
                  { name: "country", title: "Pais" },
                  { name: "city", title: "Ciudad" },
                ]
              : [
                  { name: "userName", title: "Nombre" },
                  { name: "userLastName", title: "Apellido" },
                  { name: "userRole", title: "Rol" },
                  { name: "seniority", title: "Seniority" },
                  { name: "country", title: "Pais" },
                  { name: "city", title: "Ciudad" },
                ]
          }
        />
        <View style={styles.divider} />
        {!userData.worker ? null : (
          <>
            <ProfileDrawerItem
              textItem={
                !userData.available ? "Activar busqueda" : "desactivar busqueda"
              }
              onPress={() => setShowModeModal(true)}
            >
              {}
              {
                <AntDesign
                  name={!userData.available ? "check" : "close"}
                  size={24}
                  color={colors.secondary}
                />
              }
            </ProfileDrawerItem>
            <Modal
              isVisible={showModeModal}
              animationIn="zoomIn"
              animationOut="zoomOut"
              onBackButtonPress={() => {
                setShowModeModal(false);
                setUserMode(userData.available);
              }}
              onBackdropPress={() => {
                setShowModeModal(false);
                setUserMode(userData.available);
              }}
              backdropOpacity={0}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <View style={styles.modeModalContainer}>
                <Text>
                  {userData.worker
                    ? "¿En busca de empelo?"
                    : "¿Dispuesto a contratar?"}
                </Text>
                {
                  // switcher
                }
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>No</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: colors.secondary }}
                    thumbColor={"#f4f3f4"}
                    onValueChange={() => setUserMode(!userMode)}
                    value={userMode}
                  />
                  <Text>Si</Text>
                </View>
                {loading ? (
                  <ActivityIndicator size={65} />
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      marginTop: 15,
                    }}
                  >
                    <ReusableButton
                      styleContainer={[{ width: 80 }]}
                      innerText={"Aceptar"}
                      onPress={changeMode}
                    />
                    <View style={{ width: 15 }}></View>
                    <ReusableButton
                      onPress={() => {
                        setShowModeModal(false);
                        setUserMode(userData.available);
                      }}
                      styleContainer={[{ width: 80 }]}
                      innerText={"Cancelar"}
                    />
                  </View>
                )}

                {
                  // end switcher
                }
              </View>
            </Modal>
            <View style={styles.divider} />
          </>
        )}
        <ProfileDrawerItem
          textItem={"Ayuda y soporte técnico"}
          onPress={() => navigation.navigate("HelpAndSupport")}
        >
          <AntDesign
            name="questioncircleo"
            size={24}
            color={colors.secondary}
          />
        </ProfileDrawerItem>
        <View style={styles.divider} />
        <ProfileDrawerItem
          textItem={"Equipo"}
          onPress={() => setShowCreatorsModal(true)}
        >
          <Feather name="users" size={24} color={colors.secondary} />
        </ProfileDrawerItem>
        <Modal
          animationIn="zoomIn"
          animationOut="zoomOut"
          isVisible={showCreatorsModal}
          onBackdropPress={() => setShowCreatorsModal(false)}
          onBackButtonPress={() => setShowCreatorsModal(false)}
        >
          <CreatorsModal
            isVisible={showCreatorsModal}
            closeModal={closeCreatorsModal}
          />
        </Modal>
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
  modeModalContainer: {
    position: "relative",
    padding: 30,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 15,
    borderColor: "#aaa",
    borderWidth: 1,
  },
});

export default DrawerMenu;
