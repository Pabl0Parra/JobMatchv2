import {
  createDrawerNavigator
} from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import DrawerMenu from "./DrawerMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigatorProfile = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        drawerPosition: "right",
        drawerStyle: { width: "100%" }, 
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Perfil" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorProfile;
