import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import Constants from "expo-constants";
import Card from "../components/Card";
import Header from "../components/Header";
import Swiper from "react-native-deck-swiper";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db, mainCollection, postCollection } from "../firebase/credentials";
import {
  FocusedTab,
  SwipeContext,
  UserLoginContex,
} from "../context/UserDataContext";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import theme from "../theme";
import { generateId } from "../utilities/utilities";
import ImageOfNoResults from '../svgs/ImageOfNoResults'

const { colors, text } = theme;

const Home = () => {
  const swipeRef = useRef(null);
  const { userData, setTab } = useContext(UserLoginContex);
  const navigation = useNavigation();

  const [profiles, setProfiles] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [visits, setVisits] = useState(0);
  /* const { setTab } = useContext(FocusedTab); */
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
          where("id", "not-in", [...passesId, ...likesId]),
          where("roleWanted", "==", userData.filter.roleWanted)
        );
      } else if (
        userData.filter.seniority !== "" &&
        userData.filter.seniority !== "Todos"
      ) {
        jobsQuery = query(
          collection(db, postCollection),
          //excluyo los que ya me aparecieron
          where("id", "not-in", [...passesId, ...likesId]),
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
          where("id", "not-in", [...passesId, ...likesId]),
          where("roleWanted", "==", userData.filter.roleWanted),
          where("seniority", "==", userData.filter.seniority)
        );
      } else {
        jobsQuery = query(
          collection(db, postCollection),
          //excluyo los que ya me aparecieron
          where("id", "not-in", [...passesId, ...likesId])
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
          where("id", "not-in", [...passesId, ...likesId]),
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
          where("id", "not-in", [...passesId, ...likesId]),
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
          where("id", "not-in", [...passesId, ...likesId]),
          where("userRole", "==", userData.filter.roleWanted),
          where("seniority", "==", userData.filter.seniority)
        );
      } else {
        profileQuery = query(
          collection(db, mainCollection),
          where("worker", "==", true),
          //excluyo los que ya me aparecieron
          where("id", "not-in", [...passesId, ...likesId])
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

    /* if (userData.worker){
      console.log(visits)
      updateDoc(doc(db, mainCollection, userSwiped.userId), {
        visits: visits + 1,
      })
    } else {
      setVisits(userSwiped.id.visits)
      console.log(visits)
      updateDoc(doc(db, mainCollection, userSwiped.id), {
        visits: visits+1,
      });
    } */
      
  };

  const swipeRight = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const postSwiped = profiles[cardIndex];
    //Para obtener todos los datos del usuario logueado
    const loggedInUser = { ...userData };


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
          setDoc(doc(db, mainCollection, userData.id, "likes", postSwiped.userId), {
            ...postSwiped,
            timestamp: serverTimestamp(),
          });
          
/*           updateDoc(doc(db, mainCollection, postSwiped.userId), {
            visits: +1,
          }) */


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
/*           updateDoc(doc(db, mainCollection, postSwiped.userId), {
            visits: +1 ,
          }) */
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
/*             updateDoc(doc(db, mainCollection, postSwiped.id), {
              visits: +1,
            }); */
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
    setEmpty(!empty);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header screen="Home" />
        {profiles.length === 0? (
          <View style={styles.noProfiles}>
            <ImageOfNoResults />
            <Text style={[text.text14, { textAlign: "center", paddingHorizontal: 28, marginTop: 20}]} >
              No tienes más vacantes por ver.
              Pronto apareceran las nuevas solicitudes.
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
            </SwipeContext.Provider>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
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
    fontSize: 32,
    backgroundColor: `${colors.background}`,
  },
});
export default Home;
