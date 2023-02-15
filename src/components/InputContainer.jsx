import { StyleSheet, TextInput, Text } from "react-native";

const InputContainer = ({ styleContainer, styleError, touched, error, textErrorProp, ...restOfProp }) => {
  const styleC = [styles.container, styleContainer];
  const styleE = [styles.errorMessage, styleError];

  return (
    <>
      <TextInput style={styleC} {...restOfProp} />
      {error && touched ? (
        <Text style={styleE} {...textErrorProp}>{error}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    margin: 10,
    padding: 10,
  },
  errorMessage: {
    color: "red",
    marginLeft: 10,
  },
});

export default InputContainer;
