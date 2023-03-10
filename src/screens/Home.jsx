// IMPORTANT: Remove "where("id", "not-in", [...passesId, ...likesId])" commentting to avoid duplicates
// Left like this during development to avoid not having profiles & to recreate matches
import { View, Text, StyleSheet } from "react-native";
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
import { db, mainCollection, postCollection } from "../firebase/credentials";
import { SwipeContext, UserLoginContex } from "../context/UserDataContext";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import theme from "../theme";
import { generateId } from "../utilities/utilities";
import ImageOfNoResults from "../svgs/ImageOfNoResults";
import { updateVisits } from "../firebase/functions/updateFunctions";

const { colors, text } = theme;

const Home = () => {
  const swipeRef = useRef(null);
  const { userData, setTab } = useContext(UserLoginContex);
  const navigation = useNavigation();

  const [profiles, setProfiles] = useState([]);
  const [empty, setEmpty] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && setTab(1);
    let unsub;
    const fetchProfiles = async () => {
      //Obtengos los usuarios que deslice a la izquierda y derecha
      const postPasses = await getDocs(
        collection(db, mainCollection, userData.id, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const postLikes = await getDocs(
        collection(db, mainCollection, userData.id, "likes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      //defino un array para poder hacer la consulta a la bd
      const passesId = postPasses.length > 0 ? postPasses : ["null"];
      const likesId = postLikes.length > 0 ? postLikes : ["null"];

      /* Query para buscar puestos */
      let jobsQuery;
      if (
        userData.filter.roleWanted !== "" &&
        userData.filter.roleWanted !== "Todos"
      ) {
        jobsQuery = query(
          collection(db, postCollection),
          //excluyo los que ya me aparecieron
          // where("id", "not-in", [...passesId, ...likesId]),
          where("roleWanted", "==", userData.filter.roleWanted)
        );
      } else if (
        userData.filter.seniority !== "" &&
        userData.filter.seniority !== "Todos"
      ) {
        jobsQuery = query(
          collection(db, postCollection),
          //excluyo los que ya me aparecieron
          // where("id", "not-in", [...passesId, ...likesId]),
          where("seniority", "==", userData.filter.seniority)
        );
      } else if (
        userData.filter.roleWanted !== "" &&
        userData.filter.roleWanted !== "Todos" &&
        userData.filter.seniority !== "" &&
        userData.filter.seniority !== "Todos"
      ) {
        jobsQuery = query(
          collection(db, postCollection),
          //excluyo los que ya me aparecieron
          // where("id", "not-in", [...passesId, ...likesId]),
          where("roleWanted", "==", userData.filter.roleWanted),
          where("seniority", "==", userData.filter.seniority)
        );
      } else {
        jobsQuery = query(
          collection(db, postCollection)
          //excluyo los que ya me aparecieron
          // where("id", "not-in", [...passesId, ...likesId])
        );
      }

      /* Query para buscar candidatos */
      let profileQuery;
      if (
        userData.filter.roleWanted !== "" &&
        userData.filter.roleWanted !== "Todos"
      ) {
        profileQuery = query(
          collection(db, mainCollection),
          where("worker", "==", true),
          //excluyo los que ya me aparecieron
          // where("id", "not-in", [...passesId, ...likesId]),
          where("available", "==", true),
          where("userRole", "==", userData.filter.roleWanted)
        );
      } else if (
        userData.filter.seniority !== "" &&
        userData.filter.seniority !== "Todos"
      ) {
        profileQuery = query(
          collection(db, mainCollection),
          where("worker", "==", true),
          //excluyo los que ya me aparecieron
          // where("id", "not-in", [...passesId, ...likesId]),
          where("available", "==", true),
          where("seniority", "==", userData.filter.seniority)
        );
      } else if (
        userData.filter.roleWanted !== "" &&
        userData.filter.roleWanted !== "Todos" &&
        userData.filter.seniority !== "" &&
        userData.filter.seniority !== "Todos"
      ) {
        profileQuery = query(
          collection(db, mainCollection),
          where("worker", "==", true),
          //excluyo los que ya me aparecieron
          // where("id", "not-in", [...passesId, ...likesId]),
          where("available", "==", true),
          where("userRole", "==", userData.filter.roleWanted),
          where("seniority", "==", userData.filter.seniority)
        );
      } else {
        profileQuery = query(
          collection(db, mainCollection),
          where("worker", "==", true),
          //excluyo los que ya me aparecieron
          // where("id", "not-in", [...passesId, ...likesId]),
          where("available", "==", true)
        );
      }

      //Traigo los perfiles
      unsub = onSnapshot(
        userData.worker ? jobsQuery : profileQuery,
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== userData.id)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
      return unsub;
    };
    if (userData !== null && userData !== undefined) {
      fetchProfiles();
    } else {
      console.log("usuario no cargado");
    }
  }, [db, userData, empty, isFocused]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    setDoc(
      //agrego a passes el id del post
      doc(db, mainCollection, userData.id, "passes", userSwiped.id),
      userSwiped
    );
    userData.worker
      ? updateVisits(userSwiped.userId)
      : updateVisits(userSwiped.id);
  };

  const swipeRight = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const postSwiped = profiles[cardIndex];
    //Para obtener todos los datos del usuario logueado
    const loggedInUser = { ...userData };
    userData.worker
      ? updateVisits(postSwiped.userId)
      : updateVisits(postSwiped.id);

    if (userData.worker) {
      //Necesito chequear si el usuario al que le di like, me dio like previamente
      //Solo usar esto a modo demo (desarrollo), para produccion usar cloud functions (del lado del servidor)
      getDoc(
        doc(db, mainCollection, postSwiped.userId, "likes", userData.id)
      ).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          //hay match
          console.log(`Hiciste un match con ${postSwiped.userName}`);

          //guardo el like dado - necesito guardar el id del post, sino me vuelve a aparecer
          setDoc(
            doc(db, mainCollection, userData.id, "likes", postSwiped.userId),
            {
              ...postSwiped,
              timestamp: serverTimestamp(),
            }
          );

          //guardo el like recibido en el perfil empresa
          setDoc(
            doc(db, mainCollection, postSwiped.userId, "likedTo", userData.id),
            { ...userData, timestamp: serverTimestamp(), postId: postSwiped.id }
          );
          setDoc(
            doc(db, postCollection, postSwiped.id, "likedTo", userData.id),
            {
              ...userData,
              timestamp: serverTimestamp(),
            }
          );

          //Creo el match
          setDoc(doc(db, "Matches", generateId(userData.id, postSwiped.id)), {
            users: {
              [userData.id]: loggedInUser,
              [postSwiped.userId]: postSwiped,
            },
            usersMatched: [userData.id, postSwiped.userId],
            postMatched: [postSwiped.id],
            role: [postSwiped.roleWanted],
            timestamp: serverTimestamp(),
          });

          setDoc(
            doc(db, mainCollection, userData.id, "matches", postSwiped.id),
            {
              ...postSwiped,
              usersMatched: [userData.id, postSwiped.userId],
              users: {
                [userData.id]: loggedInUser,
                [postSwiped.UserId]: postSwiped,
              },
              timestamp: serverTimestamp(),
            }
          );

          navigation.navigate("MatchModal", {
            loggedInUser,
            postSwiped,
          });
        } else {
          //solo guardo el like
          setDoc(doc(db, mainCollection, userData.id, "likes", postSwiped.id), {
            ...postSwiped,
            timestamp: serverTimestamp(),
          });
          //guardo el like recibido en el post
          setDoc(
            doc(db, postCollection, postSwiped.id, "likedTo", userData.id),
            {
              ...userData,
              timestamp: serverTimestamp(),
            }
          );
          setDoc(
            doc(db, mainCollection, postSwiped.userId, "likedTo", userData.id),
            {
              ...userData,
              timestamp: serverTimestamp(),
            }
          );
        }
      });
    } else {
      //Si soy empresa:

      //Necesito chequear si el usuario al que le di like, me dio like previamente
      //Solo usar esto a modo demo (desarrollo), para produccion usar cloud functions (del lado del servidor)
      getDoc(doc(db, mainCollection, postSwiped.id, "likes", userData.id)).then(
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            //hay match
            console.log(`Hiciste un match con ${postSwiped.userName}`);
            //guardo el like dado
            setDoc(
              doc(db, mainCollection, userData.id, "likes", postSwiped.id),
              {
                ...postSwiped,
                timestamp: serverTimestamp(),
              }
            );

            //guardo el like recibido en el perfil recibido
            setDoc(
              doc(db, mainCollection, postSwiped.id, "likedTo", userData.id),
              { ...userData, timestamp: serverTimestamp() }
            );

            //Creo el match
            setDoc(doc(db, "Matches", generateId(userData.id, postSwiped.id)), {
              users: {
                [userData.id]: loggedInUser,
                [postSwiped.id]: postSwiped,
              },
              usersMatched: [userData.id, postSwiped.id],
              timestamp: serverTimestamp(),
            });

            setDoc(
              doc(db, mainCollection, userData.id, "matches", postSwiped.id),
              {
                ...postSwiped,
                timestamp: serverTimestamp(),
              }
            );

            navigation.navigate("MatchModal", {
              loggedInUser,
              postSwiped,
            });
          } else {
            //guardo el like

            setDoc(
              doc(db, mainCollection, userData.id, "likes", postSwiped.id),
              {
                ...postSwiped,
                timestamp: serverTimestamp(),
              }
            );
            /*             updateDoc(doc(db, mainCollection, postSwiped.id), {
              visits: +1,
            }); */
            //guardo el like recibido en el otro perfil
            setDoc(
              doc(db, mainCollection, postSwiped.id, "likedTo", userData.id),
              {
                ...userData,
                timestamp: serverTimestamp(),
              }
            );
          }
        }
      );
    }
  };

  const handleEnd = () => {
    setProfiles([]);
    setEmpty(false);
  };

  return (
    <View style={styles.container}>
      <Header screen="Home" />
      {profiles.length === 0 ? (
        <View style={[styles.noProfiles, { height: "95%" }]}>
          <ImageOfNoResults />

          <Text
            style={[
              text.text14,
              {
                textAlign: "center",
                paddingHorizontal: 28,
                marginTop: 20,
              },
            ]}
          >
            No tienes más {userData.worker ? "puestos" : "perfiles"} por ver :/{" "}
            {"\n"}
            Pronto aparecerán las nuevas oportunidades!
          </Text>
        </View>
      ) : (
        <>
          <SwipeContext.Provider value={{ swipeRef }}>
            <View style={styles.header}>
              <Text style={text.headerTitle}>
                Hola,{" "}
                <Text style={{ color: `${colors.secondary}` }}>
                  {userData?.userName}!
                </Text>
              </Text>
              <Text style={[text.text16]}>
                {userData.worker
                  ? "Estas son las vacantes disponibles"
                  : "Estos son los perfiles disponibles"}
              </Text>
            </View>
            <View style={{ flex: 1, width: "100%", position: "relative" }}>
              <Swiper
                // añadiendo el key para que se re-renderize el componente cada vez que se cambia el array de profiles - quitar para que no se re-renderizen los profiles ya vistos
                key={profiles.length}
                ref={swipeRef}
                containerStyle={{ backgroundColor: "#F2F3F4", flex: 1 }}
                cardStyle={{ top: 20 }}
                cardHorizontalMargin={16}
                stackSize={3}
                cardIndex={0}
                verticalSwipe={false}
                onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
                onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
                onSwipedAll={() => handleEnd()}
                animateCardOpacity
                overlayLabels={{
                  left: {
                    title: "No me interesa",
                    style: {
                      label: {
                        textAlign: "right",
                        color: `${colors.text}`,
                      },
                    },
                  },
                  right: {
                    title: "Me interesa",
                    style: {
                      label: {
                        textAlign: "left",
                        color: `${colors.text}`,
                      },
                    },
                  },
                }}
                overlayLabelStyle={{
                  fontSize: 24,
                  padding: 16,
                }}
                cards={profiles}
                renderCard={(card) =>
                  card ? (
                    <Card card={card} refe={useRef} />
                  ) : (
                    <View style={[styles.noProfiles, { height: "80%" }]}>
                      <ImageOfNoResults />

                      <Text
                        style={[
                          text.text14,
                          {
                            textAlign: "center",
                            paddingHorizontal: 28,
                            marginTop: 20,
                          },
                        ]}
                      >
                        No tienes más {userData.worker ? "puestos" : "perfiles"}{" "}
                        por ver :/ {"\n"}
                        Pronto aparecerán las nuevas oportunidades!
                      </Text>
                    </View>
                  )
                }
              />
            </View>
          </SwipeContext.Provider>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  header: {
    width: "100%",
    textAlign: "left",
    zIndex: 10,
    color: "#525252",
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
  },
  noProfiles: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${colors.background}`,
  },
});
export default Home;
