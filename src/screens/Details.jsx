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
import { useEffect, useState } from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import theme from "../theme";

const { colors, text } = theme;

const Details = ({ route, navigation }) => {
  /* const { id, name, title, image } = route.params; */
  const { vacant, image  } = route.params;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, height: "50%" }}>
        <Image
          source={{
            uri: image
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ width: "90%", height: "100%", alignItems: "center" }}>
          <ScrollView style={styles.detailsDescription}>
            <View>
              <Text style={text.descriptionTitle}>
                {vacant} {<Text style={text[14]}>Junior</Text>}
              </Text>
              <Text style={text[14]}>Argentina (remoto)</Text>
              <Text style={text[14]}>Jornada completa</Text>
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text style={text.descriptionSubtitle}>
                Descripción del empleo
              </Text>
              <Text style={text.descriptionItem}>
                Formación:{" "}
                {<Text style={text[14]}>Tecnicatura en desarrollo web</Text>}
              </Text>
              <Text style={text.descriptionItem}>
                Experiencia:{" "}
                {<Text style={text[14]}>1 año de experiencia profesional</Text>}
              </Text>
              <View>
                <Text style={text.descriptionItem}>
                  Requisitos {"\n"}
                  {
                    <>
                      <Text style={text[14]}>
                        {" "}
                        • Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Dignissimos quos iste perferendis non, itaque
                        cumque. Suscipit voluptates, quos sunt eius consequuntur
                        placeat, earum error amet, possimus quae nemo omnis vel!
                      </Text>
                      {"\n"}
                      <Text style={text[14]}>
                        {" "}
                        • Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Dignissimos quos iste perferendis non, itaque
                        cumque. Suscipit voluptates, quos sunt eius consequuntur
                        placeat, earum error amet, possimus quae nemo omnis vel!
                      </Text>
                      {"\n"}
                      <Text style={text[14]}>
                        {" "}
                        • Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Dignissimos quos iste perferendis non, itaque
                        cumque. Suscipit voluptates, quos sunt eius consequuntur
                        placeat, earum error amet, possimus quae nemo omnis vel!
                      </Text>
                    </>
                  }
                </Text>
              </View>
            </View>
            <View>
              <Text style={text.descriptionItem}>
                Condiciones contractuales{"\n"}
                {<>
                  <Text style={text.descriptionItem}>Horario: <Text style={text[14]}>Lunes a Viernes de 8hs a 17hs</Text></Text>{"\n"}
                  <Text style={text.descriptionItem}>Tipo de contrato: <Text style={text[14]}>Contractor</Text></Text>{"\n"}
                  <Text style={text.descriptionItem}>Salario estimado: <Text style={text[14]}>A convenir</Text></Text>{"\n"}
                  </>}
              </Text>
            </View>
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
    height:"100%",
    flex: 1,
    margin: 32,
    padding: 16,
    textAlign: "left",
  },
});

export default Details;
