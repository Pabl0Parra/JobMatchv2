import { Text, StyleSheet } from 'react-native';
import DisplayContainer from '../components/DisplayContainer';

const Messages = () => {
  return (
    <DisplayContainer style={styles.container}>
      <Text>Messages</Text>
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
export default Messages;