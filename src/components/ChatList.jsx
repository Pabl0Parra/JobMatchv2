import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "../firebase/credentials";
import ChatRow from "./ChatRow";
import { UserLoginContex } from "../context/UserDataContext";
import ImageOfNoResults from "../svgs/ImageOfNoResults";
import theme from "../theme";

const { colors } = theme;

export default function ChatList() {
  const [matches, setMatches] = useState([]);
  const { userData } = useContext(UserLoginContex);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "Matches"),
          where("usersMatched", "array-contains", userData.id)
        ),
        (snapshot) => {
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      ),
    []
  );

  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={[styles.noProfiles, { height: "95%" }]}>
      <ImageOfNoResults />
      <Text style={styles.noProfilesText}>No hay nadie con el que chatear</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noProfiles: {
    alignItems: "center",
    justifyContent: "center",
  },
  noProfilesText: {
    marginTop: 20,
    fontSize: 20,
    color: colors.secondary,
    fontWeight: "500",
  },
});
