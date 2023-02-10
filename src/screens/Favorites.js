import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const Favorites = () => {
  return (
    <View style={styles.container}>
    <Header />
      <Text>En esta seccion se ven perfiles que te gustaron pero aun no les diste like para poder matchear</Text>
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

export default Favorites;