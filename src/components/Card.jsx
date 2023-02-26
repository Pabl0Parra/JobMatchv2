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
import { getTimeLapsed } from "../utilities/utilities";
import { collection, doc, getDoc } from "@firebase/firestore";
import { db, mainCollection } from "../firebase/credentials";

const { colors, text } = theme;

const Card = ({ card }) => {
  const { userData } = useContext(UserLoginContex);
  const navigation = useNavigation();
  const [time, setTime] = useState();
  const [image, setImage] = useState();

  const getCompanyImage = async () => {
    const docRef = doc(db, mainCollection, card.userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { image } = docSnap.data();
      setImage(image);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (userData.worker) {
      const fireBaseTime = new Date(card.timestamp.seconds * 1000);
      setTime(getTimeLapsed(fireBaseTime));
      getCompanyImage();
    } else {
      card.image !== ""
        ? setImage(card.image)
        : setImage(
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          );
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: "45%", backgroundColor: "#fff", width: "100%" }}>
        <View style={styles.header}>
          <Image
            source={{
              uri: image,
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
                {userData.worker ? (
                  <>
                    <Text style={[text[12], { color: "#fff" }]}>
                      Hace {time}
                    </Text>
                    <Text style={[text.cardTitle, { color: "#fff" }]}>
                      {card.roleWanted}{" "}
{/*                       <Text
                        style={[
                          text[16],
                          { color: `${colors.primary}`, fontStyle: "normal" },
                        ]}
                      >
                        {card.seniority}
                      </Text> */}
                    </Text>
                    <Text
                        style={[
                          text[16],
                          { color: `${colors.details}`, fontStyle: "italic" },
                        ]}
                      >
                        {card.seniority}
                      </Text>

                    {/* Salario */}
{/*                     <Text
                      style={[
                        text[14],
                        { color: `${colors.details}`, fontStyle: "italic" },
                      ]}
                    >
                      {card.salary}
                    </Text> */}
                    <View style={{ marginVertical: 16 }}>
                      <Text
                        style={[text.cardSubtitleMedium, { color: "#fff" }]}
                      >
                        {card.userName +
                          (card.userLastName ? card.userLastName : "")}
                      </Text>
                      <Text style={[text[14], { color: "#fff" }]}>
                        {card.country + (card.city ? ` - ${card.city}` : "")}
                      </Text>
                      <Text style={[text[14], { color: "#fff" }]}>
                        {card.timeJob} - {card.mode}
                        {"\n"}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <Text>{"\n"}</Text>
                    <Text style={[text.cardTitle, { color: "#fff" }]}>
                      {card.userName +
                        (card.userLastName ? card.userLastName : "")}
                    </Text>
                    <Text style={[text[16], { color: "#fff", fontSize: 18 }]}>
                      {card.roleWanted}{" "}
                      {card.seniority ? (
                        <Text
                          style={[
                            text[14],
                            { color: `${colors.details}`, fontStyle: "normal" },
                          ]}
                        >
                          {"   "}
                          {card.seniority}
                        </Text>
                      ) : null}
                    </Text>

                    <View style={{ marginVertical: 16 }}>
                      <Text
                        style={[text.cardSubtitleMedium, { color: "#fff" }]}
                      >
                        {card.country}{" "}
                        {card.city ? (
                          <Text
                            style={[
                              text[14],
                              {
                                color: `${colors.primary}`,
                                fontStyle: "italic",
                              },
                            ]}
                          >
                            {"- "}{card.city}
                          </Text>
                        ) : (
                          <Text></Text>
                        )}
                      </Text>

                      {card.userLastRole ? <Text style={[text[14], { color: `${colors.primary}` }]}>
                      {"\n"}
                        Último trabajo:{"\n"}
                        <Text style={[text[14], { color: `${colors.primary}`}]}>
                          {"  "}{card.userLastRole} en {card.userLastCompany}
                        </Text>

                      </Text> : <Text></Text>}
                    </View>
                  </>
                )}
              </ScrollView>
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate("Details", userData.worker ? {
                  //Agregar los datos necesarios para mostrar en pantalla
                  //Datos de empresa
                  image: image,
                  roleWanted: card.roleWanted,
                  seniority: card.seniority,
                  country: card.country,
                  mode: card.mode,
                  timeJob: card.timeJob,
                  requirements: card.requirements,
                  salary: card.salary,
                  hourHand: card.hourHand,
                  contract: card.contract,
                  education: card.education,
                  experience: card.experience,
                  english: card.english,
                  functions: card.functions,
                } : {
                  //Datos de perfil
                  image:image, 
                  roleWanted: card.roleWanted,
                  seniority: card.seniority,
                  country: card.country,
                  education: card.education,
                  experience: card.experience,
                  english: card.english,
                  name: card.userName,
                  lastName: card.userLastName,
                  about: card.about,
                })
              }
            >
              <Text
                style={[
                  styles.footerText,
                  {
                    color: `${colors.details}`,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Leer más
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
