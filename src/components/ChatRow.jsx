import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { UserLoginContex } from "../context/UserDataContext";
import getMatchedUserInfo from "../firebase/functions/getMatchedUserInfo";
import { db } from "../firebase/credentials";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";

export default function ChatRow({ matchDetails }) {
  const navigation = useNavigation();
  const { userData } = useContext(UserLoginContex);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, userData.id));
  }, [matchDetails, userData]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "Matches", matchDetails.id, "Messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("Message", { matchDetails })}
    >
      <Image
        style={styles.chatImage}
        source={{ uri: matchedUserInfo?.image }}
      />
      <View>
        <Text style={styles.name}>{matchedUserInfo?.userName}</Text>
        <Text>{lastMessage || "Say hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.41,
    elevation: 2,
  },
  chatImage: {
    marginRight: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
  },
});
