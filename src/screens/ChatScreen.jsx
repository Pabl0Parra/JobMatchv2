import React, { useContext, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import theme from "../theme";
import ChatList from "../components/ChatList";
import { useIsFocused } from "@react-navigation/native";
import { UserLoginContex } from "../context/UserDataContext";

const colors = theme.colors;

export default function ChatScreen() {
  const { setTab } = useContext(UserLoginContex);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && setTab(3);
  }, [isFocused]);

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
      <ChatList />
    </>
  );
}
