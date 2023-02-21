import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  ImageBackground,
  Pressable,
} from "react-native";
import { UserDataContext, UserLoginContex } from "../context/UserDataContext";
import { db } from "../firebase/credentials";
import Background from "../svgs/card_background.png";

import ActionsButtons from "./ActionsButtons";

const Card = ({ navigation, card, action }) => {
  const { userData } = useContext(UserLoginContex);
  const [active, setActive] = useState(false);

  useEffect(()=>{
    //Funciona bien, pero hay que ver si se puede obtener actualizaciones en tiempo real sin tener que volver a llamar al setSaved en handleSaved. 
    const save = async ()=>{
      await getDoc(doc(db, "HomeTest", userData.id, "saved", card.id)).then(
        (docsnapshot) => {
          if (docsnapshot.exists()) { setActive(true)}
          else {setActive(false)}
        })
    }
    save()
  },[active])

  const handleSaved = (card) => {
    getDoc(doc(db, "HomeTest", userData.id, "saved", card.id)).then(
      (docsnapshot) => {
        if (docsnapshot.exists()) {
          deleteDoc(doc(db, "HomeTest", userData.id, "saved", card.id));
          setActive(false)
          console.log(`Quitaste de favorito a ${card.name}`);
        } else {
          console.log(`Guardaste el perfil ${card.name}`);
          setDoc(doc(db, "HomeTest", userData.id, "saved", card.id), card);
          setActive(true)
        }
      }
    );
    return active;
  };
  return (
    <View style={styles.container}>
      <View style={{ height: "45%", backgroundColor: "white", width: "100%" }}>
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
                <Text style={styles.footerSubtitle}>Hace 5 horas</Text>
                <Text style={styles.footerTitle}>{card.vacant}</Text>
                <Text style={styles.footerSubtitle}>Junior</Text>
                <Text style={styles.footerName}>{card.name}</Text>
                <Text style={styles.footerText}>Argentina</Text>
                <Text style={styles.footerText}>Jornada completa</Text>
                <Text></Text>
              </ScrollView>
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate("Details", { name: "Detalles del perfil" })
              }
            >
              <Text
                style={[
                  styles.footerText,
                  { color: "#84FFFF", textDecorationLine: "underline" },
                ]}
              >
                Ver más detalles
              </Text>
            </Pressable>
          </View>

          <ActionsButtons pressed={action} saved={() => handleSaved(card)} active={active} />
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
  footerTitle: {
    fontSize: 32,
    lineHeight: 32,
    color: "#fff",
    letterSpacing: 0.5,
    textAlign: "justify",
  },
  footerSubtitle: {
    fontSize: 14,
    lineHeight: 18,
    color: "#fff",
    letterSpacing: 0.5,
    textAlign: "justify",
    margin: 5,
  },
  footerName: {
    fontSize: 20,
    lineHeight: 35,
    color: "#fff",
    letterSpacing: 0.5,
    textAlign: "justify",
    marginTop: 15,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#fff",
    letterSpacing: 0.5,
    textAlign: "justify",
  },
  moreDetails: {
    width: "100%",
    backgroundColor: "#fff",
  },
});
export default Card;
