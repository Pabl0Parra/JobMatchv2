import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function SenderMessage({ message }) {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: message.image }} style={styles.image} /> */}
      <Text style={styles.message}>{message.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D4E5FA",
    borderRadius: 8,
    borderTopLeftRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 4,
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
    color: "#000",
  },
});
