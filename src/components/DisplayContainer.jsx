import { StyleSheet, View } from 'react-native';

const DisplayContainer = ({ children, style, ...restOfProp }) => {

  const componentStyles = [
    styles.container,
    style
  ]

  return (
    <View style={componentStyles} {...restOfProp}>
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    margin: 0
  },
});

export default DisplayContainer;
