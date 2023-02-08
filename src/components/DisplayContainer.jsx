import { StyleSheet, View } from 'react-native';

const DisplayContainer = ({children}) => {

  const componentStyles = [
    styles.container
  ]

  return (
    <View style={componentStyles}>
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 25,
        margin: 0
    },
});

export default DisplayContainer;
