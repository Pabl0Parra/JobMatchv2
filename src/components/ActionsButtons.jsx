import { AntDesign, Entypo, FontAwesome, Fontisto } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const ActionsButtons = ({ pressed, saved, active}) => {
/*   const [active, setActive] = useState(false);
  const handleTouch = () => {
    setActive(!active);
  }; */
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => pressed.current.swipeLeft()}
      >
        <Entypo name="cross" size={24} color="#84FFFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={saved
        }
      >
        <FontAwesome
          name={active ? "bookmark" : "bookmark-o"}
          size={20}
          color="#84FFFF"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => pressed.current.swipeRight()}
      >
        <AntDesign name="hearto" size={20} color="#84FFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 16,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#84FFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ActionsButtons;
