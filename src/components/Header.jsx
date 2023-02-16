import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import LogoHeader from "../svgs/LogoHeader";

const Header = ({ screen }) => {
  return (
    <View style={styles.container}>
      <LogoHeader/>
      {screen === "Home" ? (
        <TouchableOpacity style={styles.notification}>
          <FontAwesome name="bell-o" size={24} color="#091D5C" />
        </TouchableOpacity>
      ) : screen === "Profile" ? (
        <TouchableOpacity style={styles.notification}>
          <Feather name="settings" size={24} color="#091D5C" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    /*     position:"absolute",*/
    top: 0,
    left: 0,
    width: "100%",
    height: "8%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  notification: {
    width: 30,
    height: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Header;
