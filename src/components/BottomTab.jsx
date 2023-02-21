import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../theme";

//screens
import Home from "../screens/Home";
import Conexiones from "../screens/Conexiones";
import Explore from "../screens/Explore";
import Messages from "../screens/Messages";
import Profile from "../screens/Profile";

//icons
import { MaterialIcons, Fontisto, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const {colors}  =theme
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: `${colors.secondary}`,
        tabBarInactiveTintColor:"#C8CFCF",
        tabBarStyle:{
          height:"8%",
          backgroundColor:"#fff",
          borderStyle:"solid",
          borderColor:"white",
          

        },
        tabBarItemStyle:{
          paddingVertical: 10,
        }
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-repair-service" size={32} color={color} />
          ),
          
          headerShown: false
        }}
      />
{/*       <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="find-replace" size={32} color={color} />
          ),
          headerShown: false
        }}
      /> */}
      <Tab.Screen
        name="Conexiones"
        component={Conexiones}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" size={32} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Mensajes"
        component={Messages}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" size={32} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={32} color={color} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}
