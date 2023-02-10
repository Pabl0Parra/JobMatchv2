import { AntDesign, Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const ActionsButtons = () => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button}>
        <Entypo name="cross" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <AntDesign name="hearto" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop:10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ActionsButtons;
