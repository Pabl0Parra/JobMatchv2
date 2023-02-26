import { StyleSheet, Text, TouchableOpacity } from "react-native";
import theme from "../theme";

const {colors, text} = theme; 

const ProfileDrawerItem = ({ children, style, textItem, ...restOfProp }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} {...restOfProp}>
        {children}
      <Text style={[ text.headerTitle , styles.text]}>{textItem}</Text>
    </TouchableOpacity>
  );
};

export default ProfileDrawerItem;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "relative",
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 56,
    paddingVertical: 15
  },
  text: {
    position: "relative",
    marginLeft: 15,
    fontSize: 22,
    bottom: 3,
    color: colors.secondary
  }
})