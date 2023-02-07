import { StyleSheet, View } from 'react-native';

const DisplayContainer = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default DisplayContainer;
