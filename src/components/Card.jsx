import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";

import ActionsButtons from "./ActionsButtons";

const Card = ({ navigation, card, action }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: card.image,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <Text style={styles.footerTitle}>{card.vacant}</Text>
          <Text style={styles.footerSubtitle}>Hace 5 horas</Text>
          <Text style={styles.footerName}>{card.name}</Text>
          <Text style={styles.footerText}>Argentina</Text>
          <Text style={styles.footerText}>Jornada completa</Text>
        </ScrollView>

        {/*           <Button
            title="Ver perfil"
            onPress={() =>
              navigation.navigate("Details", { name: "Detalles del perfil" })
            }
          /> */}
      </View>
        <ActionsButtons pressed={action} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "83%",
    borderRadius: 24,
    backgroundColor: "#091D5C",
    overflow: "hidden",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    height: 216,
    width: "100%",
    /*     backgroundColor: "teal", */
  },

  image: {
    width: "100%",
    height: "100%",
  },
  footer: {
    flex: 1,
    width: "100%",
    padding: 32,
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
  footerText:{
    fontSize: 14,
    lineHeight: 18,
    color: "#fff",
    letterSpacing: 0.5,
    textAlign: "justify",
  }
});
export default Card;
