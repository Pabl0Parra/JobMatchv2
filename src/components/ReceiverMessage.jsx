import { View, Image, Text, StyleSheet } from "react-native";
import React from "react";

export default function ReceiverMessage({ message }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: message.image }} style={styles.image} />
      <Text style={styles.message}>ReceiverMessage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    borderRadius: 8,
    borderTopRightRadius: "none",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 6,
    marginVertical: 4,
    alignSelf: "flex-start",
    marginLeft: 14,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: "absolute",
    top: 0,
    left: -56,
  },
  message: {
    color: "#fff",
  },
});
