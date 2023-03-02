import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { UserLoginContex } from "../context/UserDataContext";
import TextTicker from "react-native-text-ticker";
import theme from "../theme";
import { getTimeLapsed } from "../utilities/utilities";

const { text, colors } = theme;

const MiniCard = ({ item, large, id }) => {
  const { userData } = useContext(UserLoginContex);
  const navigation = useNavigation();
  const [time, setTime] = useState();

  useEffect(() => {
    const fireBaseTime = new Date(item?.timestamp?.seconds * 1000);
    setTime(getTimeLapsed(fireBaseTime));
  }, []);

  return (
    <View
      style={[
        styles.miniCard,
        large ? styles.large : styles.medium,
        large ? { marginHorizontal: 20 } : { marginHorizontal: 10 },
      ]}
      key={id}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Details",
            userData.worker
              ? {
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
                }
              : {
                  //Datos de perfil
                  image: item.image,
                  roleWanted: item.filter.roleWanted,
                  seniority: item.seniority,
                  country: item.country,
                  education: item.education,
                  experience: item.experience,
                  english: item.english,
                  name: item.userName,
                  lastName: item.userLastName,
                  about: item.about,
                }
          )
        }
      >
        <Image
          source={{
            uri: item.image,
          }}
          style={{
            width: "100%",
            height: large ? 152 : 100,
            borderRadius: 12,
          }}
        />
        <View
          style={{ paddingVertical: 10, paddingHorizontal: large ? 20 : 8 }}
        >
          <TextTicker
            duration={4000}
            loop
            bounce
            repeatSpacer={30}
            marqueeDelay={1000}
            style={[text.text16, styles.textColor]}
          >
            {item?.userName} {""} {item?.userLastName ? item.userLastName : ""}
          </TextTicker>
          <TextTicker
            duration={4000}
            loop
            bounce
            repeatSpacer={30}
            marqueeDelay={1000}
            style={[text.text14, styles.textColor]}
          >
            {large ? item?.filter?.roleWanted : item?.userRole  }
          </TextTicker>
          {large ? (
            <Text style={[text.text12, styles.textColor]}>Hace {time}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  miniCard: {
    marginVertical: 10,
    backgroundColor: `${colors.primary}`,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  large: {
    width: 232,
    height: 244,
  },
  medium: {
    width: 144,
    height: 160,
  },
  textColor: {
    color: `${colors.text}`,
  },
});

export default MiniCard;
