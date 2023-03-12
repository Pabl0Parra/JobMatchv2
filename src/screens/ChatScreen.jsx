import React, { useContext, useEffect } from "react";
import ChatList from "../components/ChatList";
import { useIsFocused } from "@react-navigation/native";
import { UserLoginContex } from "../context/UserDataContext";

export default function ChatScreen() {
  const { setTab } = useContext(UserLoginContex);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && setTab(3);
  }, [isFocused]);

  return (
    <>
      <ChatList />
    </>
  );
}
