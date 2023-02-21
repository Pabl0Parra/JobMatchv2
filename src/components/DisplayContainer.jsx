import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import theme from '../theme';

const {colors} = theme;
const DisplayContainer = ({ children, style, ...restOfProp }) => {
  const componentStyles = [
    styles.container,
    style
  ]

  return (
    <ScrollView contentContainerStyle={componentStyles} {...restOfProp}>
      {children}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    height:"100%",
    width:"100%", 
    backgroundColor:`${colors.background}`,
    position: "relative",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
});

export default DisplayContainer;
