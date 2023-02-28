import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";

const MatchModal = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInUser, userSwiped } = params;

  return (
    <View style={styles.contanier}>
      <Text style={styles.text}>Tienes un match!</Text>
      <View>
        <Text>
          {loggedInUser.name} y {userSwiped.name}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={loggedInUser.image} style={styles.image} />
        <Image source={userSwiped.image} style={styles.image} />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          navigation.navigate("ChatScreen");
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 20, color: "#091D5C" }}>Enviar mensaje</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchModal;

const styles = StyleSheet.create({
  contanier: {
    height: "100%",
    width: "100%",
    padding: 30,
    backgroundColor: "#091D5C",
    opacity: 0.95,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  imageContainer: {
    width: "90%",
    flexDirection: "row",
    height: 250,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#fff",
    color: "#091D5C",
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
