import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import Constants from "expo-constants";
import Card from "../components/Card";
import Header from "../components/Header";
import Swiper from "react-native-deck-swiper";
import { useContext, useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase/credentials";
import generateId from "../utilities/generateId";
import { async } from "@firebase/util";

const Home = ({ navigation }) => {
  const [user, setUser] = useState({
    id: "BcBIgbnZmVY5DHsRzNQOqzBnBMg1",
    email: "nicotest@hotmail.com",
    name: "Nico",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
  });
  const swipeRef = useRef(null);

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let unsub;
    if (user !== null && user !== undefined) {
      const fetchProfiles = async () => {
        //Obtengos los usuarios que deslice a la izquierda y derecha
        const passes = await getDocs(
          collection(db, "HomeTest", user.id, "passes")
        ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

        const likes = await getDocs(
          collection(db, "HomeTest", user.id, "likes")
        ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

        //defino un array para poder hacer la consulta a la bd
        const passesUsersId = passes.length > 0 ? passes : ["null"];
        const likesUsersId = likes.length > 0 ? likes : ["null"];

        unsub = onSnapshot(
          query(
            collection(db, "HomeTest"),
            where("employer", "==", true),
            where("id", "not-in", [...passesUsersId, ...likesUsersId])
          ),
          (snapshot) => {
            setProfiles(
              snapshot.docs
                .filter((doc) => doc.id !== user.id)
                .map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))
            );
            //Para cuando tenga el contexto y filtre para que no me aparezca el usuario incluido con los otros perfiles
            /* setProfiles(snapshot.docs.filter(doc => doc.id !== user.uid)map(doc =>({
          id:doc.id,
          ...doc.data()
        }))) */

            // -- Debería filtrar por las preferencias de búsqueda
          }
        );
      };
      fetchProfiles();
    } else {
      console.log("usuario no cargado");
    }
    return unsub;
  }, [db]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, "HomeTest", user.id, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    //Para obtener todos los datos del usuario logueado
    /* const loggedInUser = await( await getDoc(doc(db, "HomeTest", user.id)).data() ) */
    const loggedInUser = { ...user };

    //Necesito chequear si el usuario al que le di like, me dio like previamente
    //Solo usar esto a modo demo (desarrollo), para produccion usar cloud functions (del lado del servidor)
    getDoc(doc(db, "HomeTest", userSwiped.id, "likes", user.id)).then(
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          //hay match
          console.log(`Hiciste un match con ${userSwiped.name}`);
          //guardo el like
          setDoc(
            doc(db, "HomeTest", user.id, "likes", userSwiped.id),
            userSwiped
          );

          //Creo el match
          setDoc(doc(db, "Matches", generateId(user.id, userSwiped.id)), {
            users: {
              [user.id]: loggedInUser,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.id, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("MatchModal", {
            loggedInUser,
            userSwiped,
          });
        } else {
          //guardo el like
          setDoc(
            doc(db, "HomeTest", user.id, "likes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header screen="Home" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hola, {user?.name}!</Text>
          <Text style={{fontSize:16}}>Estas son algunas de las vanactes disponibles:</Text>
        </View>
        <View style={{ flex:1, width: "100%", position: "relative" }}>
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: "#fff", flex:1 }}
            cardStyle={{top:10}}
            cardHorizontalMargin={16}
            stackSize={3}
            cardIndex={0}
            verticalSwipe={false}
            onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
            onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
            animateCardOpacity
            overlayLabels={{
              left: {
                title: "NO",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "SI",
                style: {
                  label: {
                    textAlign: "left",
                    color: "green",
                  },
                },
              },
            }}
            cards={profiles}
            renderCard={(card) =>
              card ? (
                <Card navigation={navigation} card={card} action={swipeRef} />
              ) : (
                <View style={styles.noProfiles}>
                  <Text>No hay más perfiles :c</Text>
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={{
                      uri: "https://emojis.wiki/emoji-pics/google/neutral-face-google.png",
                    }}
                  />
                </View>
              )
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  header: {
    width: "100%",
    textAlign: "left",
    zIndex: 10,
    color: "#525252",
    paddingHorizontal:16,
  },
  headerTitle:{
    fontSize:24
  },
  noProfiles: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 32,
    backgroundColor: "#fafafa",
  },
});
export default Home;
