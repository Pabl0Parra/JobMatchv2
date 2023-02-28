import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SenderMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "purple",
    borderRadius: 8,
    borderTopRightRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 6,
    marginVertical: 4,
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
  message: {
    color: "#fff",
  },
});
