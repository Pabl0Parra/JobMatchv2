import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";

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
    position: "relative",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    margin: 0,
    marginTop: Constants.statusBarHeight
  },
});

export default DisplayContainer;
