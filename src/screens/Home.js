import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import Constants from "expo-constants";
import Card from "../components/Card";
import Header from "../components/Header";
import Swiper from "react-native-deck-swiper";
import { useEffect, useRef, useState } from "react";
import {collection, doc, onSnapshot} from '@firebase/firestore'
import {db} from '../firebase/credentials'

const Home = ({ navigation }) => {
  const dummyData = [];
  const swipeRef = useRef(null);

  const [profiles, setProfiles] = useState([]);

  useEffect(()=>{
    let unsub;
    const fetchProfiles = ()=>{
      unsub = onSnapshot(collection(db, 'HomeTest'), snapshot =>{
        setProfiles(snapshot.docs.map(doc =>({
          id:doc.id,
          ...doc.data()
        })))
        //Para cuando tenga el contexto y filtre para que no me aparezca el usuario incluido con los otros perfiles
        /* setProfiles(snapshot.docs.filter(doc => doc.id !== user.uid)map(doc =>({
          id:doc.id,
          ...doc.data()
        }))) */

        // -- Debería filtrar por las preferencias de búsqueda

      })
    }

    fetchProfiles();
    return unsub
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header screen="Home" />
        <View style={styles.textHeader}>
          <Text>Hola, usuario!</Text>
          <Text>Estas son algunas de las vanactes disponibles:</Text>
        </View>
        <View style={{ height: "100%", width: "100%", position: "relative" }}>
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: "#f1f1f1" }}
            stackSize={3}
            cardIndex={0}
            verticalSwipe={false}
            onSwipedLeft={() => console.log("no me interesa")}
            onSwipedRight={() => console.log("me interesa")}
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
                  <Image style={{width:200, height:200}}source={{uri: "https://emojis.wiki/emoji-pics/google/neutral-face-google.png"}}/>
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
    marginTop:Constants.statusBarHeight,
    flex: 1,
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#ECF0F1",
  },
  textHeader: {
    width: "90%",
    textAlign: "left",
    position: "absolute",
    top: "10%",
    left: "8%",
    zIndex: 10,
  },
  noProfiles:{
    height:"90%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    fontSize:32,
    backgroundColor:"#fafafa"
  }
});
export default Home;
