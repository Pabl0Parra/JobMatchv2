import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import theme from "../theme";

const { colors } = theme;

export default function SenderMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message.message}</Text>
      <View style={styles.containerBefore} />
      <View style={styles.containerAfter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignContent: "flex-end",
    backgroundColor: "#D4E5FA",
    padding: 10,
    paddingHorizontal: 15,
    marginVertical: 6,
    marginLeft: "auto",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D4E5FA",
    right: 20,
  },
  containerBefore: {
    content: "",
    position: "absolute",
    visibility: "visible",
    top: -1,
    right: -10,
    borderLeftWidth: 10,
    borderLeftColor: "#D4E5FA",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderTopWidth: 10,
    borderTopColor: "#D4E5FA",
  },
  containerAfter: {
    content: "",
    position: "absolute",
    visibility: "visible",
    top: 0,
    right: -8,
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderTopWidth: 10,
    borderTopColor: "#D4E5FA",
    clear: "both",
  },
  message: {
    color: `${colors.text}`,
    fontSize: 16,
    fontWeight: "400",
  },
});
