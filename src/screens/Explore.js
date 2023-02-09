import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const Explore = () => {
  return (
    <View style={styles.container}>
    <Header />
      <Text>Explore</Text>
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

export default Explore;