import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { theme } from "../theme";

const { colors } = theme;

export default function SenderMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#D4E5FA",
    borderRadius: 8,
    borderTopRightRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 4,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    position: "absolute",
    top: 0,
    right: 0,
  },
  message: {
    color: `${colors.text}`,
    fontSize: 16,
  },
});
