import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const Saved = () => {
  return (
    <View style={styles.container}>
    <Header />
      <Text>Saved</Text>
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

export default Saved;