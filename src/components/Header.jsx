import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import LogoHeader from "../svgs/LogoHeader";
import theme from "../theme";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";

const { colors } = theme;
const Header = ({ screen }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {screen === "Home" ? (
        <>
          <LogoHeader />
          <View style={{ flexDirection: "row" }}>
            {/* <TouchableOpacity style={styles.notification} onPress={()=> navigation.navigate('PostForm')}>
            <Ionicons name="add" size={24} color={colors.secondary} />
          </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.notification}
              onPress={() => navigation.navigate("Filters")}
            >
              <Ionicons
                name="filter-sharp"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notification}>
              <FontAwesome name="bell-o" size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </>
      ) : screen === "Profile" ? (
        <>
          <Text style={{ fontSize: 20 }}>Perfil</Text>
          <TouchableOpacity
            style={styles.notification}
            onPress={() => navigation.openDrawer()}
          >
            <Feather name="settings" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </>
      ) : screen === "Conexiones" ? (
        <>
          <Text style={{ fontSize: 20 }}>Conexiones</Text>
        </>
      ) : screen === "ChatScreen" ? (
        <>
          <Text style={{ fontSize: 20 }}>Mensajes</Text>
        </>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "7%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  notification: {
    width: 30,
    height: 30,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Header;
