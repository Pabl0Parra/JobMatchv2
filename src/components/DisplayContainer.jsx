import { StyleSheet, View } from 'react-native';
import theme from '../theme';

const {colors} = theme;
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
    backgroundColor:`${colors.background}`,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width:"100%",
    margin: 0,
    padding: 0
  },
});

export default DisplayContainer;
