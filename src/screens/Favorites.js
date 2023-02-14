import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import DisplayContainer from '../components/DisplayContainer';

const Favorites = () => {
  return (
    <DisplayContainer style={styles.container}>
    <Header />
      <Text>En esta seccion se ven perfiles que te gustaron pero aun no les diste like para poder matchear</Text>
    </DisplayContainer>
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