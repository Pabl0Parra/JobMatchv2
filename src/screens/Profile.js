import { View, Text, StyleSheet, Button } from 'react-native';
import Header from '../components/Header';
import logOut from "../firebase/functions/logOut"

const Profile = () => {
  return (
    <View style={styles.container}>
    <Header screen="Profile" />
      <Text>Profile</Text>
      <Button title="cerrar sesión"
      onPress={() => logOut()}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
  },
});

export default Profile;