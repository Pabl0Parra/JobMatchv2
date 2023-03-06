import React, { useContext, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import theme from "../theme";
import ChatList from "../components/ChatList";
import { useIsFocused } from "@react-navigation/native";
import { UserLoginContex } from "../context/UserDataContext";
import DisplayContainer from "../components/DisplayContainer";
import { Header } from "@react-navigation/elements";

const colors = theme.colors;

export default function ChatScreen() {
  const { setTab } = useContext(UserLoginContex);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && setTab(3);
  }, [isFocused]);

  return (
    <>
      <DisplayContainer style={styles.container}>
        {/* <Header screen="ChatScreen" style={{ backgroundColor: "white" }} /> */}
        <ChatList />
      </DisplayContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
