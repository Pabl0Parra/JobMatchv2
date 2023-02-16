import { Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import DisplayContainer from '../components/DisplayContainer';

const Explore = () => {
  return (
    <DisplayContainer style={styles.container}>
    <Header />
      <Text>Explore</Text>
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

export default Explore;