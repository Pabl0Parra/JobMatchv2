import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { AntDesign, Entypo } from "@expo/vector-icons";

const Card = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
        style={styles.image}
      />
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text>Nombre</Text>
            <Text>Edad</Text>
            <Text>Profesion</Text>
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
            officiis facilis laboriosam ea! Voluptatem quidem eveniet corporis
            enim error maiores nisi mollitia.
          </Text>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Entypo name="cross" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="hearto" size={32} color="black" />
          </TouchableOpacity>
        </View>
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
    width: "90%",
    height: "100%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 10,
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
  buttonsContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:15,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Card;
