import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import theme from "../theme";
import ReusableButton from "../components/ReusableButton";
import ConfettiCannon from "react-native-confetti-cannon";

const { colors, text } = theme;

const MatchModal = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInUser, postSwiped } = params;

  const confettiRef = useRef(null);

  useEffect(() => {
    confettiRef.current.start();
  }, []);

  return (
    <View style={styles.container}>
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        explosionSpeed={500}
        ref={confettiRef}
        colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
        duration={5000}
        onConfettiComplete={() => {
          confettiRef.current && confettiRef.current.reset();
        }}
        pointerEvents="none"
      />

      <Text style={[text.cardSubtitleMedium, { fontWeight: "400" }]}>
        ¡Enhorabuena!
      </Text>
      <Text
        style={[text.cardTitle, { color: colors.secondary, fontWeight: "800" }]}
      >
        Hiciste Match
      </Text>
      <View style={styles.imageContainer}>
        <View
          style={[
            styles.image,
            {
              position: "absolute",
              backgroundColor: colors.details,
              width: 140,
              height: 140,
              right: 40,
            },
          ]}
        >
          <View
            style={[
              styles.image,
              {
                backgroundColor: "white",
                width: 130,
                height: 130,
              },
            ]}
          >
            <Image
              source={{
                uri: loggedInUser.image,
              }}
              style={styles.image}
            />
          </View>
        </View>
        <View
          style={[
            styles.image,
            {
              position: "absolute",
              backgroundColor: colors.details,
              width: 140,
              height: 140,
              left: 40,
            },
          ]}
        >
          <View
            style={[
              styles.image,
              {
                backgroundColor: "white",
                width: 130,
                height: 130,
              },
            ]}
          >
            <Image
              source={{
                uri: postSwiped.image,
              }}
              style={styles.image}
            />
          </View>
        </View>
      </View>
      <View style={[{ paddingHorizontal: 50 }]}>
        <Text style={[text.text16, { textAlign: "center" }]}>
          Has hecho match con:
        </Text>
        <Text
          style={[
            text.cardTitle,
            { textAlign: "center", color: colors.secondary, paddingTop: 10 },
          ]}
        >
          {postSwiped.userName}
        </Text>
        <Text style={styles.action}>Animate a dar el primer paso.</Text>
      </View>
      <ReusableButton
        innerText={"Enviar mensaje"}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("ChatScreen");
        }}
        styleContainer={{ marginTop: 19 }}
      />
      <ReusableButton
        innerText={"Quizás más tarde"}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Main");
        }}
        styleContainer={{ marginTop: 30 }}
      />
    </View>
  );
};

export default MatchModal;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    color: "#fff",
  },
  imageContainer: {
    width: "90%",
    flexDirection: "row",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -20,
  },
  action: {
    color: "#fff",
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
