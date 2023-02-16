import { AntDesign, Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const ActionsButtons = ({pressed}) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={()=>pressed.current.swipeLeft()}>
        <Entypo name="cross" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>pressed.current.swipeRight()}>
        <AntDesign name="hearto" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop:10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ActionsButtons;
