import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Header from "../components/Header";
import DisplayContainer from "../components/DisplayContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import MiniCard from "../components/MiniCard";
import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, mainCollection } from "../firebase/credentials";
import { UserLoginContex } from "../context/UserDataContext";
import { useIsFocused } from "@react-navigation/native";

const { text, colors } = theme;

const Conexiones = () => {
  const { userData, setUserData, setTab } = useContext(UserLoginContex);
  const [saved, setSaved] = useState([]);
  const [matches, setMatches] = useState([]);
  const [likedTo, setLikedTo] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const savedProfiles = onSnapshot(
      collection(db, mainCollection, userData.id, "saved"),
      (snapshot) => {
        let temp = [];
        snapshot.forEach((doc) => temp.push(doc.data()));
        setSaved(temp);
        setUserData({
          ...userData,
          savedCount: `${saved?.length}`,
        });
      }
    );

    //TODO: Cómo puedo obtener los perfiles a los que le gustó mi perfil?
    //Había hechoo que muestre los perfiles con los que hice match, no los que me dieron like
    /*     const matchedProfiles = onSnapshot(
      collection(db, "HomeTest", userData.id, "matches"),
      (snapshot) => {
        let temp = [];
        snapshot.forEach((doc) => temp.push(doc.data()));
        console.log(temp);
        setMatches(temp);
      }
    ); */

    const likedProfiles = onSnapshot(
      collection(db, mainCollection, userData.id, "likedTo"),
      (snapshot) => {
        let temp = [];
        snapshot.forEach((doc) => temp.push(doc.data()));
        setLikedTo(temp);
      }
    );
    isFocused && setTab(2);
    return likedProfiles, savedProfiles;
  }, [isFocused]);

  return (
    <DisplayContainer style={styles.container}>
      <Header screen="Conexiones" />
      <ScrollView>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="heart"
            size={20}
            color={colors.secondary}
          />
          <Text style={text.text16}>Les gustas!</Text>
          <Text style={[text.text14, { textAlign: "center" }]}>
            Les gustas ¡Aquí podrás ver a quién le ha gustado tu perfil
            profesional!
          </Text>
        </View>
        <View style={{ minHeight: "40%" }}>
          {likedTo.length > 0 ? (
            <FlatList
              style={{ marginVertical: 16 }}
              horizontal
              data={likedTo}
              renderItem={({ item }) => (
                <MiniCard item={item} large id={item.id} />
              )}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text style={text.text14}>Aún no recibiste me gusta</Text>
            </View>
          )}
        </View>
        <View style={{ paddingTop: 16 }}>
          <Text style={[text.cardSubtitleMedium, { paddingHorizontal: 20 }]}>
            Favoritos
          </Text>
        </View>
        <View style={{ minHeight: "30%" }}>
          {saved.length > 0 ? (
            <FlatList
              style={{ marginVertical: 16 }}
              horizontal
              data={saved}
              renderItem={({ item }) => <MiniCard item={item} medium />}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text style={text.text14}>
                Aquí verás los perfiles que guardaste
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </DisplayContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 16,
  },
});

export default Conexiones;
