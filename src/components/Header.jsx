import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

const Header = ({ screen }) => {
  return (
    <View style={styles.container}>
      <Text>Job Match</Text>
      {screen === "Home" ? (
        <TouchableOpacity style={styles.notification}>
          <FontAwesome name="bell-o" size={20} color="black" />
        </TouchableOpacity>
      ) : screen === "Profile" ? (
        <TouchableOpacity style={styles.notification}>
          <Feather name="settings" size={24} color="black" />
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
    backgroundColor: "lightblue",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
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
