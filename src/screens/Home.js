import { View, Text, StyleSheet, Button } from "react-native";
import logOut from "../firebase/functions/logOut"

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="cerrar sesión"
      onPress={() => logOut()}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
  },
});
export default Home;
