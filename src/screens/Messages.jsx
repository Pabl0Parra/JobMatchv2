import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import theme from "../theme";

const { colors } = theme;

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

const ChatScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
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
        <Text style={{ fontSize: 20, fontWeight: "500", marginTop: 50 }}>
          Mensajes
        </Text>
      </View>
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
          <Text style={{ fontSize: 10, fontWeight: "500", marginBottom: 5 }}>
            !Mira¡ Estos son los match que quieren conectar contigo
          </Text>
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

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 5 }}>
          Chats
        </Text>
        <FlatList
          data={CHATS_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Image
                source={item.avatar}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  {item.name}
                </Text>
                <Text>{item.lastMessage}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 12, color: "gray" }}>{item.time}</Text>
                {item.unreadMessages > 0 && (
                  <View
                    style={{
                      backgroundColor: `${colors.secondary}`,
                      borderRadius: 10,
                      paddingHorizontal: 5,
                      marginTop: 5,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "white" }}>
                      {item.unreadMessages}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
