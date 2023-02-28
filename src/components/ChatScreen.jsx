import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import theme from "../theme";
import BackButton from "./BackButton";
import ChatList from "./ChatList";

const colors = theme.colors;

const CHATS_DATA = [
  {
    id: "1",
    name: "Laura Jiménez",
    lastMessage: "Oye, ¿qué estás haciendo?",
    time: "11:30 AM",
    avatar: require("../images/google_buscador.png"),
    unreadMessages: 2,
  },
  {
    id: "2",
    name: "Jorge Vargas",
    lastMessage: "Claro, nos vemos a las 2 PM.",
    time: "10:20 AM",
    avatar: require("../images/google_buscador.png"),
    unreadMessages: 4,
  },
  {
    id: "3",
    name: "NoCountry",
    lastMessage: "Te veré mañana.",
    time: "Ayer",
    avatar: require("../images/google_buscador.png"),
    unreadMessages: 0,
  },
  {
    id: "4",
    name: "María González",
    lastMessage: "Oye, ¿qué estás haciendo?",
    time: "7:30 PM",
    avatar: require("../images/google_buscador.png"),
    unreadMessages: 12,
  },
];

export default function ChatScreen() {
  return (
    <>
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: `${colors.primary}`,
          padding: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.75,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            marginTop: 50,
            color: `${colors.secondary}`,
          }}
        >
          Mensajes
        </Text>
      </SafeAreaView>
      <View
        style={{
          flexDirection: "row-reverse",
          height: 100,
          padding: 20,
          borderBottomColor: "#CAC4D0",
          borderBottomWidth: 1,
          backgroundColor: `${colors.background}`,
        }}
      >
        <View style={{ width: "60%", padding: 10 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              marginBottom: 5,
              color: `${colors.text}`,
            }}
          >
            !Mira¡ Estos son los match que quieren conectar contigo
          </Text>
          <TouchableOpacity
            style={{
              textDecorationLine: "none",
              fontSize: 14,
              fontWeight: "500",
            }}
            // onPress={() => navigation.navigate("Home")}
          >
            <Text>Ver</Text>
          </TouchableOpacity>
          {/* Dónde va esto? */}
          {/* <a
        href="https://www.google.com"
        style={{
          textDecorationLine: "none",
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        Ver
      </a> */}
        </View>
        <View style={{ width: "40%", overflow: "hidden", paddingRight: 10 }}>
          <FlatList
            data={CHATS_DATA}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ marginRight: -20 }}>
                <Image
                  source={item.avatar}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </View>
            )}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </View>
      <ChatList />
    </>
  );
}
