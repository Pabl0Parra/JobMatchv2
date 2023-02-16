import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";

import ActionsButtons from "./ActionsButtons";

const Card = ({ navigation, card, action}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: card.avatar,
        }}
        style={styles.image}
      />
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text>{card.name}</Text>
            <Text>Edad</Text>
            <Text>{card.rol}</Text>
          </View>
        </View>
        <ScrollView style={styles.description}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            distinctio magnam nulla. Consectetur incidunt magni dolores tempore
            impedit dolorum cumque non necessitatibus. Tenetur nesciunt
            voluptatum deleniti consequatur quo, quam asperiores.
          </Text>
          <Text> </Text>
          <Text>
            Dolores error aliquid quos est maxime quidem molestias, at
            recusandae veniam itaque adipisci reiciendis, quo dolorem nisi
            officiis facilis laboriosam ea!
          </Text>
          <Button
            title="Ver perfil"
            onPress={() =>
              navigation.navigate("Details", { name: "Detalles del perfil" })
            }
          />
        </ScrollView>
        <ActionsButtons pressed={action}/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 10,

    shadowColor:"#000",
    shadowOffset:{width:0, height:5},
    shadowOpacity:0.3,
    shadowRadius:2,
    elevation:3,
  },
  header: {
    height: "25%",
    width: "80%",
    /*     backgroundColor: "teal", */
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    right: "3%",
    top: "8%",
    zIndex: 2,
  },
  description: {
    /*     backgroundColor: "green", */
    width: "80%",
    paddingVertical: 40,
    textAlign: "justify",
  },
});
export default Card;
