import { AntDesign, Entypo, FontAwesome, Fontisto } from "@expo/vector-icons";
import { deleteDoc, doc, getDoc, setDoc } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SwipeContext, UserLoginContex } from "../context/UserDataContext";
import { db } from "../firebase/credentials";

const ActionsButtons = ({ card }) => {
  const {userData} = useContext(UserLoginContex)
  const { swipeRef } = useContext(SwipeContext)

  const [active, setActive] = useState(false);

  useEffect(()=>{
    //Funciona bien, pero hay que ver si se puede obtener actualizaciones en tiempo real sin tener que volver a llamar al setSaved en handleSaved. 
    const save = async ()=>{
      await getDoc(doc(db, "HomeTest", userData.id, "saved", card.id)).then(
        (docsnapshot) => {
          if (docsnapshot.exists()) { setActive(true)}
          else {setActive(false)}
        })
    }
    save()
  },[active])

  const handleSaved = (card) => {
    getDoc(doc(db, "HomeTest", userData.id, "saved", card.id)).then(
      (docsnapshot) => {
        if (docsnapshot.exists()) {
          deleteDoc(doc(db, "HomeTest", userData.id, "saved", card.id));
          setActive(false)
          console.log(`Quitaste de favorito a ${id}`);
        } else {
          console.log(`Guardaste el perfil ${id}`);
          setDoc(doc(db, "HomeTest", userData.id, "saved", card.id), card);
          setActive(true)
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
        <Entypo name="cross" size={24} color="#84FFFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{handleSaved(card)}
        }
      >
        <FontAwesome
          name={active ? "bookmark" : "bookmark-o"}
          size={20}
          color="#84FFFF"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => swipeRef.current.swipeRight()}
      >
        <AntDesign name="hearto" size={20} color="#84FFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 16,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#84FFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ActionsButtons;
