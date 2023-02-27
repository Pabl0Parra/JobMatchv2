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

const { colors, text } = theme;

const Details = ({ route, navigation }) => {
  const { userData } = useContext(UserLoginContex);
  /* const { id, name, title, image } = route.params; */
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
    about,
  } = route.params;

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
                    {roleWanted} {<Text style={text[16]}>{seniority}</Text>}
                  </Text>
                  <Text style={text[14]}>{country}</Text>
                  <Text style={text[14]}>
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
                      <Text style={text[14]}>{education}</Text>
                    ) : (
                      <Text style={text[14]}>No especificado</Text>
                    )}
                  </Text>
                  <Text style={text.descriptionItem}>
                    Experiencia:{" "}
                    {experience ? (
                      <Text style={text[14]}>{experience}</Text>
                    ) : (
                      <Text style={text[14]}>No especificado</Text>
                    )}
                  </Text>
                  <Text style={text.descriptionItem}>
                    Funciones: {"\n"}
                    {functions ? (
                      <Text style={text[14]}>{functions}</Text>
                    ) : (
                      <Text style={text[14]}>No especificado</Text>
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
                              <Text style={text[14]}>{hourHand}</Text>
                            ) : (
                              <Text style={text[14]}>No especificado</Text>
                            )}
                          </Text>
                          {"\n"}
                          <Text style={text.descriptionItem}>
                            Tipo de contrato:{" "}
                            {contract ? (
                              <Text style={text[14]}>{contract}</Text>
                            ) : (
                              <Text style={text[14]}>No especificado</Text>
                            )}
                          </Text>
                          {"\n"}
                          <Text style={text.descriptionItem}>
                            Salario estimado:{" "}
                            {salary ? (
                              <Text style={text[14]}>{salary}</Text>
                            ) : (
                              <Text style={text[14]}>No especificado</Text>
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
                            <Text style={[text[14]]}>
                              {requirements}
                              {"\n"}
                            </Text>
                          ) : (
                            <Text style={text[14]}>No especificado</Text>
                          )}
                          {english ? (
                            <Text style={[text.descriptionItem]}>
                              Inglés:{" "}
                              {english ? (
                                <Text style={text[14]}>Si</Text>
                              ) : (
                                <Text style={text[14]}>No</Text>
                              )}
                            </Text>
                          ) : (
                            <Text style={text[14]}>No especificado</Text>
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
                    {name}
                    {""}
                    {lastName ? lastName : ""}
                  </Text>

                  <Text style={text[16]}>{roleWanted}</Text>
                  <Text style={text[14]}>{seniority}</Text>
                  <Text style={text[14]}>{country}</Text>
                </View>
                <View style={{ marginVertical: 20 }}>
                  <Text style={text.descriptionSubtitle}>
                    Acerca de mi
                  </Text>
                  <Text style={text[16]}>
                    {about}
                  </Text>

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
    /* marginTop: Constants.statusBarHeight, */
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
