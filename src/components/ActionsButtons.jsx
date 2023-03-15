import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { deleteDoc, doc, getDoc, setDoc } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SwipeContext, UserLoginContex } from "../context/UserDataContext";
import { db, mainCollection } from "../firebase/credentials";
import theme from "../theme";

const { colors } = theme;

const ActionsButtons = ({ card }) => {
  const { userData } = useContext(UserLoginContex);
  const { swipeRef } = useContext(SwipeContext);

  const [active, setActive] = useState(false);

  useEffect(() => {
    //Funciona bien, pero hay que ver si se puede obtener actualizaciones en tiempo real sin tener que volver a llamar al setSaved en handleSaved.
    const save = async () => {
      await getDoc(doc(db, mainCollection, userData.id, "saved", card.id)).then(
        (docsnapshot) => {
          if (docsnapshot.exists()) {
            setActive(true);
          } else {
            setActive(false);
          }
        }
      );
    };
    save();
  }, [active]);

  const handleSaved = (card) => {
    getDoc(doc(db, mainCollection, userData.id, "saved", card.id)).then(
      (docsnapshot) => {
        if (docsnapshot.exists()) {
          deleteDoc(doc(db, mainCollection, userData.id, "saved", card.id));
          setActive(false);
        } else {
          setDoc(doc(db, mainCollection, userData.id, "saved", card.id), card);
          setActive(true);
        }
      }
    );
    return active;
  };

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => swipeRef.current.swipeLeft()}
      >
        <Entypo name="cross" size={24} color={colors.details} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { width: 40, height: 40 }]}
        onPress={() => {
          handleSaved(card);
        }}
      >
        <FontAwesome
          name={active ? "bookmark" : "bookmark-o"}
          size={20}
          color={colors.details}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => swipeRef.current.swipeRight()}
      >
        <AntDesign name="hearto" size={24} color={colors.details} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 32,
    marginTop: 8,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: `${colors.details}`,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ActionsButtons;
