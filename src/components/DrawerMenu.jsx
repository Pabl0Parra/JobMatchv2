import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DisplayContainer from "./DisplayContainer";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

import theme from "../theme";

const { colors, text } = theme;

const DrawerMenu = ({ navigation }) => {

  return (
    <DisplayContainer style={[styles.displayContainer]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity
          style={styles.arrowleft}
          onPress={(e) => navigation.closeDrawer()}
        >
          <AntDesign name="arrowleft" size={32} color={colors.secondary} />
        </TouchableOpacity>
        <Text
          style={[
            text.descriptionTitle,
            { color: colors.secondary, marginLeft: 10 },
          ]}
        >
          Configuración
        </Text>
      </View>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    paddingTop: Constants.statusBarHeight + 15,
    paddingHorizontal: 25,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default DrawerMenu;
