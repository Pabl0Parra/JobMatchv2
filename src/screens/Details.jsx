import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import ActionsButtons from "../components/ActionsButtons";
import { useContext, useEffect, useState } from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import theme from "../theme";
import { UserLoginContex } from "../context/UserDataContext";
import ExperienceCard from "../components/ExperienceCard";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db, mainCollection } from "../firebase/credentials";

const { colors, text } = theme;

const Details = ({ route, navigation }) => {
  const { userData } = useContext(UserLoginContex);
  const [experiences, setExperiences] = useState();
  const {
    seniority,
    country,
    mode,
    roleWanted,
    image,
    timeJob,
    requirements,
    education,
    salary,
    hourHand,
    contract,
    experience,
    functions,
    english,
    name,
    lastName,
    aboutme,
    id,
    userRole
  } = route.params;

  useEffect(() => {
/*     userData.employer &&
    getDocs(doc(db, mainCollection, id, "experiences")).then((snapshot) => {
      if (snapshot.exists()) {
        let exp=[];
        snapshot.forEach((doc) => exp.push(doc));
        setExperiences(exp)
      }
    }); */
    if(userData.employer){

      const exp = onSnapshot(
        collection(db, mainCollection, id, "experiences"),
        (snapshot) => {
          let temp = [];
          snapshot.forEach((doc) => temp.push(doc.data()));
          setExperiences(temp);
        }
        );
        return exp;
      }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, height: "50%" }}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ width: "90%", height: "100%", alignItems: "center" }}>
          <ScrollView style={styles.detailsDescription}>
            {userData.worker ? (
              <>
                <View>
                  <Text style={text.descriptionTitle}>
                    {roleWanted} {<Text style={text.text16}>{seniority}</Text>}
                  </Text>
                  <Text style={text.text14}>{country}</Text>
                  <Text style={text.text14}>
                    {timeJob} - ({mode ? mode : null})
                  </Text>
                </View>
                <View style={{ marginVertical: 20 }}>
                  <Text style={text.descriptionSubtitle}>
                    Descripción del empleo
                  </Text>

                  <Text style={text.descriptionItem}>
                    Formación:{" "}
                    {education ? (
                      <Text style={text.text14}>{education}</Text>
                    ) : (
                      <Text style={text.text14}>No especificado</Text>
                    )}
                  </Text>
                  <Text style={text.descriptionItem}>
                    Experiencia:{" "}
                    {experience ? (
                      <Text style={text.text14}>{experience}</Text>
                    ) : (
                      <Text style={text.text14}>No especificado</Text>
                    )}
                  </Text>
                  <Text style={text.descriptionItem}>
                    Funciones: {"\n"}
                    {functions ? (
                      <Text style={text.text14}>{functions}</Text>
                    ) : (
                      <Text style={text.text14}>No especificado</Text>
                    )}
                  </Text>

                  <View style={{ marginVertical: 8 }}>
                    <Text style={text.descriptionItem}>
                      Condiciones contractuales{"\n"}
                      {
                        <>
                          <Text style={text.descriptionItem}>
                            Horario:{" "}
                            {hourHand ? (
                              <Text style={text.text14}>{hourHand}</Text>
                            ) : (
                              <Text style={text.text14}>No especificado</Text>
                            )}
                          </Text>
                          {"\n"}
                          <Text style={text.descriptionItem}>
                            Tipo de contrato:{" "}
                            {contract ? (
                              <Text style={text.text14}>{contract}</Text>
                            ) : (
                              <Text style={text.text14}>No especificado</Text>
                            )}
                          </Text>
                          {"\n"}
                          <Text style={text.descriptionItem}>
                            Salario estimado:{" "}
                            {salary ? (
                              <Text style={text.text14}>{salary}</Text>
                            ) : (
                              <Text style={text.text14}>No especificado</Text>
                            )}
                          </Text>
                        </>
                      }
                    </Text>
                  </View>

                  <View style={{ marginVertical: 8 }}>
                    <Text style={text.descriptionItem}>
                      Requisitos{"\n"}
                      {
                        <>
                          {requirements ? (
                            <Text style={[text.text14]}>
                              {requirements}
                              {"\n"}
                            </Text>
                          ) : (
                            <Text style={text.text14}>
                              No especificado{"\n"}
                            </Text>
                          )}
                          {english ? (
                            <Text style={[text.descriptionItem]}>
                              Inglés:{" "}
                              {english ? (
                                <Text style={text.text14}>Si</Text>
                              ) : (
                                <Text style={text.text14}>No</Text>
                              )}
                            </Text>
                          ) : (
                            <Text style={text.text14}>No especificado</Text>
                          )}
                        </>
                      }
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View>
                  <Text style={text.descriptionTitle}>
                    {name} {lastName ? lastName : ""}
                  </Text>

                  <Text style={text.text16}>{userRole}</Text>
                  <Text style={text.text14}>{seniority}</Text>
                  <Text style={text.text14}>{country}</Text>
                </View>
                <View style={{ marginVertical: 20 }}>
                  <Text style={text.descriptionSubtitle}>Acerca de mi</Text>
                  <Text style={text.text16}>{aboutme}</Text>
                </View>
                <View style={{ marginVertical: 20 }}>
                  <Text style={text.descriptionSubtitle}>Experiencia</Text>
                  {experiences ?
                    experiences.map((exp) => (
                      <ExperienceCard
                        key={exp.id}
                        experienceData={exp}
                        details={true}
                      />
                    )): <Text></Text>}
                </View>
              </>
            )}
          </ScrollView>
        </View>
        {/* Tendria que pasar el objeto de datos de card para que funcione */}
        {/* <ActionsButtons/> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    backgroundColor: `${colors.background}`,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 2,
  },
  detailsContainer: {
    height: "70%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
    backgroundColor: `${colors.background}`,
    alignItems: "center",
    zIndex: 2,
  },
  detailsDescription: {
    width: "100%",
    height: "100%",
    flex: 1,
    margin: 32,
    padding: 16,
    textAlign: "left",
  },
});

export default Details;
