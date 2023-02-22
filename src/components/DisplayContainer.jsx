import { StyleSheet, View, ScrollView } from 'react-native';

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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    margin: 0,
    padding: 0
  },
});

export default DisplayContainer;
