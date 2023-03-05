import { View, Image, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "../theme";

const { colors } = theme;

export default function ReceiverMessage({ message }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: message.image }} style={styles.image} />
      <Text style={styles.message}>{message.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#A3D2FE",
    borderRadius: 8,
    borderTopLeftRadius: 0,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 5,
    marginHorizontal: 30,
    marginVertical: 8,
    alignSelf: "flex-start",
    marginLeft: 50,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    position: "absolute",
    top: 0,
    left: -36,
  },
  message: {
    color: `${colors.text}`,
    fontSize: 16,
    fontWeight: "500",
  },
});
