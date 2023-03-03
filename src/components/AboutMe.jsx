import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import theme from "../theme";
import { Octicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import getUserDataDB from "../firebase/functions/getUserDataDB";
import { UserLoginContex } from "../context/UserDataContext";
import InputContainer from "./InputContainer";
import { updateDataUser } from "../firebase/functions/updateFunctions";

const { colors, text } = theme;

const AboutMe = () => {
  const { userData, setUserData } = useContext(UserLoginContex);
  const [showInput, setShowInput] = useState(false);

  const formik = useFormik({
    initialValues: {
      description: userData?.aboutme ? userData?.aboutme : "",
    },
    onSubmit: async (values) => {
      await updateDataUser({aboutme: values.description}, userData.id);

      const res = await getUserDataDB(userData.id);

      if (res) {
        setUserData(res);
        setShowInput(!showInput);
      } else {
        console.log("error al obtener los datos");
      }
    },
  });

  return (
    <View style={styles.aboutMe}>
      <View style={styles.header}>
        <View>
          <Text
            style={[
              text.descriptionSubtitle,
              { fontSize: 18, color: colors.text },
            ]}
          >
            Acerca de mi
          </Text>
        </View>
        <View style={{ width: showInput ? "40%" : "53%" }}></View>
        {!showInput ? (
          <TouchableOpacity onPress={() => setShowInput(!showInput)}>
            <Octicons name="pencil" size={24} color={colors.secondary} />
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                formik.values.description = userData?.aboutme;
                setShowInput(!showInput);
              }}
            >
              <AntDesign
                name="leftcircleo"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <View style={{ width: 15 }}></View>
            <TouchableOpacity
              onPress={() => {
                formik.handleSubmit();
              }}
            >
              <MaterialIcons
                name="save-alt"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {showInput ? (
        <InputContainer
          stylePlaceholder={{ backgroundColor: "rgba(255,255,255,1" }}
          styleContainer={styles.input}
          value={formik.values.description}
          onChangeText={formik.handleChange("description")}
          multiline={true}
        />
      ) : (
        <View style={{ alignItems: "center" }}>
          {userData?.aboutme && userData.aboutme !== "" ? (
            <Text style={[text.text16, { fontWeight: "600" }]}>
              {userData.aboutme}
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => setShowInput(!showInput)}
              style={{ alignSelf: "center" }}
            >
              <Text>
                {`Cuentanos sobre ${userData.worker ? "ti" : "tu empresa"}`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default AboutMe;

const styles = StyleSheet.create({
  aboutMe: {
    position: "relative",
    alignItems: "flex-start",
    width: "84%",
  },
  header: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    color: colors.secondary,
    fontWeight: "600",
  },
});
