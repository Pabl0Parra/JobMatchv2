import { StyleSheet, View, ScrollView } from 'react-native';

const DisplayContainer = ({ children, style, ...restOfProp }) => {

  const componentStyles = [
    styles.container,
    style
  ]

  return (
    <ScrollView contentContainerStyle={componentStyles} /* {...restOfProp} */>
      {children}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    margin: 0
  },
});

export default DisplayContainer;
