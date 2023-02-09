import { View, Text, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import Card from "../components/Card";
import Header from "../components/Header";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header screen="Home"/>
      <View style={styles.textHeader}>
        <Text>Hola, usuario!</Text>
        <Text>Estas son algunas de las vanactes disponibles:</Text>
      </View>
      <Card />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop:Constants.statusBarHeight,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
  },
  textHeader:{
    width:"90%",
    textAlign:"left",
  }
});
export default Home;
