import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../theme";

//screens
import Home from "../screens/Home";
import Conexiones from "../screens/Conexiones";
import ChatScreen from "../screens/ChatScreen";
import DrawerNavigatorProfile from "./DrawerNavigatorProfile";
import { DrawerActions } from "@react-navigation/routers";

import { View, StyleSheet } from "react-native";
import { useContext } from "react";
import { UserLoginContex } from "../context/UserDataContext";
import HomeIcon from "../svgs/HomeIcon";
import ConectionsIcon from "../svgs/ConectionsIcon";
import MessagesIcon from "../svgs/MessagesIcon";
import ProfileIcon from "../svgs/ProfileIcon";

const Tab = createBottomTabNavigator();
const { colors } = theme;

const HomeTabIcon = ({ tab, colors }) => (
  <View style={tab === 1 ? styles.activeBackTab : styles.inactiveTab}>
    <View style={tab === 1 ? styles.activeTab : styles.inactiveTab}>
      <HomeIcon
        color={tab === 1 ? colors.details : "#C8CFCF"}
        active={tab === 1 ? true : false}
      />
    </View>
  </View>
);

const ConnectionsTabIcon = ({ tab, colors }) => (
  <View style={tab === 2 ? styles.activeBackTab : styles.inactiveTab}>
    <View style={tab === 2 ? styles.activeTab : styles.inactiveTab}>
      <ConectionsIcon
        color={tab === 2 ? colors.details : "#C8CFCF"}
        active={tab === 2 ? true : false}
      />
    </View>
  </View>
);

const MessagesTabIcon = ({ tab, colors }) => (
  <View style={tab === 3 ? styles.activeBackTab : styles.inactiveTab}>
    <View style={tab === 3 ? styles.activeTab : styles.inactiveTab}>
      <MessagesIcon
        color={tab === 3 ? colors.details : "#C8CFCF"}
        active={tab === 3 ? true : false}
      />
    </View>
  </View>
);

const ProfileTabIcon = ({ tab, colors }) => (
  <View style={tab === 4 ? styles.activeBackTab : styles.inactiveTab}>
    <View style={tab === 4 ? styles.activeTab : styles.inactiveTab}>
      <ProfileIcon
        color={tab === 4 ? colors.details : "#C8CFCF"}
        active={tab === 4 ? true : false}
      />
    </View>
  </View>
);

const BottomTab = ({ tab, colors, navigation }) => (
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
        tabBarIcon: ({ color }) => <HomeTabIcon tab={tab} colors={colors} />,
        headerShown: false,
      }}
    />

    <Tab.Screen
      name="Conexiones"
      component={Conexiones}
      options={{
        tabBarIcon: ({ color }) => (
          <ConnectionsTabIcon tab={tab} colors={colors} />
        ),
        headerShown: false,
      }}
    />

    <Tab.Screen
      name="Mensajes"
      component={ChatScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MessagesTabIcon tab={tab} colors={colors} />
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
        tabBarIcon: ({ color }) => <ProfileTabIcon tab={tab} colors={colors} />,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

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
