import { StyleSheet, View, ScrollView } from 'react-native';

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
    position: 'relative',
    flex: 1,
    justifyContent: "flex-start",
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
});

export default DisplayContainer;
