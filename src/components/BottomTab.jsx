import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../theme";
import { Animated } from "react-native";

//screens
import Home from "../screens/Home";
import Conexiones from "../screens/Conexiones";
import ChatScreen from "../screens/ChatScreen";
import DrawerNavigatorProfile from "./DrawerNavigatorProfile";
import { DrawerActions } from "@react-navigation/routers";

//icons
/* import {
  MaterialIcons,
  Fontisto,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons"; */

import { View, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserLoginContex } from "../context/UserDataContext";
import HomeIcon from "../svgs/HomeIcon";
import ConectionsIcon from "../svgs/ConectionsIcon";
import MessagesIcon from "../svgs/MessagesIcon";
import ProfileIcon from "../svgs/ProfileIcon";

const Tab = createBottomTabNavigator();
const { colors } = theme;

export default function BottomTab({ navigation }) {
  const { tab } = useContext(UserLoginContex);
  /* const [tab, setTab] = useState(); */

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: `${colors.details}`,
        tabBarInactiveTintColor: "#C8CFCF",
        tabBarStyle: {
          height: "7%",
          backgroundColor: `${colors.primary}`,
          borderStyle: "solid",
          borderColor: `${colors.primary}`,
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarLabelStyle: { color: `${colors.secondary}` },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={tab === 1 ? styles.activeBackTab : styles.inactiveTab}>
              <View style={tab === 1 ? styles.activeTab : styles.inactiveTab}>
                <HomeIcon
                  color={tab === 1 ? colors.details : "#C8CFCF"}
                  active={tab === 1 ? true : false}
                />
                {/* <MaterialIcons
                    name="home-repair-service"
                    size={24}
                    color={color}
                  /> */}
              </View>
            </View>
          ),

          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Conexiones"
        component={Conexiones}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={tab === 2 ? styles.activeBackTab : styles.inactiveTab}>
              <View style={tab === 2 ? styles.activeTab : styles.inactiveTab}>
                <ConectionsIcon
                  color={tab === 2 ? colors.details : "#C8CFCF"}
                  active={tab === 2 ? true : false}
                />
                {/* <MaterialCommunityIcons
                    name="heart"
                    size={24}
                    color={color}
                  /> */}
              </View>
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Mensajes"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={tab === 3 ? styles.activeBackTab : styles.inactiveTab}>
              <View style={tab === 3 ? styles.activeTab : styles.inactiveTab}>
                <MessagesIcon
                  color={tab === 3 ? colors.details : "#C8CFCF"}
                  active={tab === 3 ? true : false}
                />
                {/* <MaterialCommunityIcons
                    name="message"
                    size={24}
                    color={color}
                  /> */}
              </View>
            </View>
          ),
          headerShown: true,
          headerStyle: { backgroundColor: `${colors.primary}` },
          headerTitleStyle: {
            color: `${colors.secondary}`,
            fontFamily: "Roboto",
            fontSize: 20,
            fontWeight: "500",
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={DrawerNavigatorProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={tab === 4 ? styles.activeBackTab : styles.inactiveTab}>
              <View style={tab === 4 ? styles.activeTab : styles.inactiveTab}>
                <ProfileIcon
                  color={tab === 4 ? colors.details : "#C8CFCF"}
                  active={tab === 4 ? true : false}
                />
              </View>
            </View>
          ),
          headerShown: false,
        }}
        listeners={{
          blur: (e) => {
            navigation.dispatch(DrawerActions.closeDrawer());
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.secondary}`,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -2,
  },
  activeBackTab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: `${colors.background}`,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -28,
  },
  inactiveTab: {
    width: 48,
    height: 48,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
