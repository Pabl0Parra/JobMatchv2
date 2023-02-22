import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackButton = ({ text }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.button}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 10,
    backgroundColor: "transparent",
    marginTop: 14,
  },
  backArrow: {
    color: "#091D5C",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    marginLeft: 24,
    color: "#091D5C",
    marginTop: -3,
  },
});

export default BackButton;
