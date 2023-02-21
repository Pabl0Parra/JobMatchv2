import { View, Text, StyleSheet, Image } from "react-native";
import Header from "../components/Header";
import DisplayContainer from "../components/DisplayContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import MiniCard from "../components/MiniCard";
import { useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/credentials";
import { UserDataContext, UserLoginContex } from "../context/UserDataContext";

const { text, colors } = theme;
const Conexiones = () => {
  const { userData } = useContext(UserLoginContex);
  const [saved, setSaved] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const savedProfiles = onSnapshot(
      collection(db, "HomeTest", userData.id, "saved"),
      (snapshot) => {
        let temp=[]
        snapshot.forEach((doc) => temp.push(doc.data()));
        console.log(temp)
        setSaved(temp);
      }
    );
    const matchedProfiles = onSnapshot(
      collection(db, "HomeTest", userData.id, "matches"),
      (snapshot) => {
        let temp=[]
        snapshot.forEach((doc) => temp.push(doc.data()));
        console.log(temp)
        setMatches(temp);
      }
    );

    return matchedProfiles, savedProfiles;
  }, []);

  return (
    <DisplayContainer style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="heart"
            size={20}
            color={colors.secondary}
          />
          <Text style={text[16]}>Les gustas!</Text>
          <Text style={[text[14], { textAlign: "center" }]}>
            Les gustas ¡Aquí podrás ver a quién le ha gustado tu perfil
            profesional!
          </Text>
        </View>
        <FlatList
          style={{ marginVertical: 16 }}
          horizontal
          data={matches}
          renderItem={({ item }) => <MiniCard item={item} large />}
        />
        <View style={{ paddingTop: 16 }}>
          <Text
            style={[
              text.subtitleMedium,
              styles.textColor,
              { paddingHorizontal: 20 },
            ]}
          >
            Favoritos
          </Text>
        </View>
        <FlatList
          style={{ marginVertical: 16 }}
          horizontal
          data={saved}
          renderItem={({ item }) => <MiniCard item={item} medium />}
        />
      </ScrollView>
    </DisplayContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 16,
  },

  center: {
    textAlign: "center",
  },
});

export default Conexiones;
