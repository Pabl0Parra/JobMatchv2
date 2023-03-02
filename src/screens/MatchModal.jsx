import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import theme from "../theme";
import ReusableButton from "../components/ReusableButton";

const { colors, text } = theme;

const MatchModal = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInUser, postSwiped } = params;

  return (
    <View style={styles.contanier}>
      <Text style={[text.cardSubtitleMedium, { fontWeight: "400" }]}>
        ¡Felicitaciones!
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
            { textAlign: "center", color: colors.secondary },
          ]}
        >
          {postSwiped.userName}
        </Text>
        <Text style={[text.text16, { textAlign: "center" }]}>
          Animate a dar el primer paso.
        </Text>
      </View>
      <ReusableButton
        innerText={"Enviar mensaje"}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("ChatScreen");
        }}
        styleContainer={{marginTop: 19}}
      />
    </View>
  );
};

export default MatchModal;

const styles = StyleSheet.create({
  contanier: {
    height: "100%",
    width: "100%",
    padding: 5,
    opacity: 0.95,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#888",
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

/* postSwiped.userName */
