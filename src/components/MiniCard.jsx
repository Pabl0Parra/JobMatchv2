import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { View, StyleSheet, Image, Text, Touchable, TouchableOpacity } from "react-native";
import { UserLoginContex } from "../context/UserDataContext";
import theme from "../theme";

const {text, colors} = theme

const MiniCard = ({item, large}) => {
  const {userData} = useContext(UserLoginContex)
  const navigation = useNavigation()
  return (
    <View style={[styles.miniCard, large ? styles.large : styles.medium, large ? {marginHorizontal: 20} : {marginHorizontal: 10}]}>
      <TouchableOpacity onPress={() =>
                navigation.navigate("Details", userData.worker ? {
                  //Agregar los datos necesarios para mostrar en pantalla
                  //Datos de empresa
                  image: item.image,
                  roleWanted: item.roleWanted,
                  seniority: item.seniority,
                  country: item.country,
                  mode: item.mode,
                  timeJob: item.timeJob,
                  requirements: item.requirements,
                  salary: item.salary,
                  hourHand: item.hourHand,
                  contract: item.contract,
                  education: item.education,
                  experience: item.experience,
                  english: item.english,
                  functions: item.functions,
                } : {
                  //Datos de perfil
                  image:item.image, 
                  roleWanted: item.roleWanted,
                  seniority: item.seniority,
                  country: item.country,
                  education: item.education,
                  experience: item.experience,
                  english: item.english,
                  name: item.userName,
                  lastName: item.userLastName,
                  about: item.about,
                })
              }>
      <Image
        source={{
          uri: `${item.image}`,
        }}
        style={{
          width: "100%",
          height: large ? 152 : 100,
          borderRadius: 12,
        }}
      />
      <View style={{ paddingVertical: 10, paddingHorizontal: large ? 20 : 8 }}>
        <Text style={[text[16], styles.textColor]}>{item.userName} {""} {item.userLastName ? item.userLastName : ""}</Text>
        <Text style={[text[14], styles.textColor]}>{item.roleWanted}</Text>
        {large ?<Text style={[text[12], styles.textColor]}>Hace 1 hora</Text> : null}
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  miniCard: {
    marginVertical:10,
    backgroundColor: `${colors.primary}`,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  large:{
    width: 232,
    height: 244,
  },
  medium:{
    width:144,
    height:160,
  },
  textColor: {
    color: `${colors.text}`,
  },
});

export default MiniCard;
