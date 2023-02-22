import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import theme from "../theme";

const {text, colors} = theme

const MiniCard = ({item, large}) => {
  return (
    <View style={[styles.miniCard, large ? styles.large : styles.medium]}>
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
        <Text style={[text[16], styles.textColor]}>{item.name}</Text>
        <Text style={[text[14], styles.textColor]}>{item.vacant}</Text>
        {large ?<Text style={[text[12], styles.textColor]}>Hace 1 hora</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  miniCard: {
    marginHorizontal: 20,
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
