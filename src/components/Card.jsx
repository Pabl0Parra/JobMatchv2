import { useNavigation } from "@react-navigation/core";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import { UserLoginContex } from "../context/UserDataContext";
import Background from "../svgs/card_background.png";
import theme from "../theme";
import ActionsButtons from "./ActionsButtons";

const { colors, text } = theme;

const Card = ({ card }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ height: "45%", backgroundColor: "#fff", width: "100%" }}>
        <View style={styles.header}>
          <Image
            source={{
              uri: card.image,
            }}
            style={styles.image}
          />
        </View>
      </View>
      <View
        style={{
          height: "90%",
          width: "100%",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <ImageBackground
          source={Background}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 32,
              width: "100%",
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.footer}>
              <ScrollView>
              {/* //TODO: calcular hace cuanto fue publicado el empleo */}
                <Text style={[text[12],{color:"#fff"}]}>Hace 5 horas</Text>
                <Text style={[text.cardTitle,{color:"#fff"}]}>{card.vacant}</Text>
                <Text style={[text[16],{color:`${colors.details}`, fontStyle:"italic"}]}>{card.seniority}</Text>
                <View style={{marginVertical:16}}>
                  <Text style={[text.cardSubtitleMedium,{color:"#fff"}]}>{card.name}</Text>
                  {/* //TODO: colocar variable de pais y demás */}
                  <Text style={[text[14],{color:"#fff"}]}>Argentina</Text>
                  <Text style={[text[14],{color:"#fff"}]}>Jornada completa</Text>
                  <Text></Text>
                </View>
              </ScrollView>
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate("Details", {
                  //Agregar los datos necesarios para mostrar en pantalla
                  vacant: card.vacant,
                  image: card.image,
                })
              }
            >
              <Text
                style={[
                  styles.footerText,
                  { color: `${colors.details}`, textDecorationLine: "underline" },
                ]}
              >
                Ver más detalles
              </Text>
            </Pressable>
          </View>

          <ActionsButtons card={card} />
        </ImageBackground>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "80%",
    borderRadius: 24,
    backgroundColor: "fff",
    overflow: "hidden",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    zIndex: -2,
    /*     backgroundColor: "teal", */
  },

  image: {
    width: "100%",
    height: "100%",
  },
  footer: {
    flex: 1,
    width: "100%",
    /* padding: 32, */
    position: "absolute",
    top: "40%",
    left: 32,
  },
  moreDetails: {
    width: "100%",
    backgroundColor: "#fff",
  },
});
export default Card;
