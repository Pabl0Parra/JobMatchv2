import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "../firebase/credentials";
import ChatRow from "./ChatRow";
import { UserLoginContex } from "../context/UserDataContext";

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

  // console.log(userData);
  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View>
      <Text>No hay matches</Text>
    </View>
  );
}
