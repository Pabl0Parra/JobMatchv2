import { View, Text, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
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

export default Profile;