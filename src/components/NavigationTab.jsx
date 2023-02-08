import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import Home from "../screens/Home";
import Saved from "../screens/Saved";
import Explore from "../screens/Explore";
import Messages from "../screens/Messages";
import Profile from "../screens/Profile";

//icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#1D8489",
        tabBarInactiveTintColor:"#C8CFCF",
        tabBarStyle:{
          height:"8%",
        },
        tabBarItemStyle:{
          paddingVertical: 10,
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-repair-service" size={32} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="find-replace" size={32} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="favorite" size={32} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" size={32} color={color} />
          ),
          tabBarBadge:"2",
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
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

export default function NavigationTab(){
  return(
  <NavigationContainer>
    <BottomTab/>
  </NavigationContainer>
  )
} 
