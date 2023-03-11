import { createDrawerNavigator } from "@react-navigation/drawer";
import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { UserLoginContex } from "../context/UserDataContext";
import Profile from "../screens/Profile";
import DrawerMenu from "./DrawerMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigatorProfile = () => {
  const { setTab } = useContext(UserLoginContex);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && setTab(4);
  }, [isFocused]);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        drawerPosition: "right",
        drawerStyle: { width: "100%" },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorProfile;
