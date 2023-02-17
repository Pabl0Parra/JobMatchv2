import { useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


const InputContainer = ({
  styleContainer,
  styleError,
  touched,
  error,
  textErrorProp,
  showHidePassword,
  ...restOfProp
}) => {
  const styleC = [styles.container, styleContainer];
  const styleE = [styles.errorMessage, styleError];
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <>
      <View>
        <TextInput
          style={styleC}
          secureTextEntry={isPasswordSecure}
          /* right={
            <TextInput.Icon
              name={() => (
                <MaterialIcons
                  name={isPasswordSecure ? "eye-off" : "eye"}
                  size={28}
                />
              )} // where <Icon /> is any component from vector-icons or anything else
              onPress={() => {
                isPasswordSecure
                  ? setIsPasswordSecure(false)
                  : setIsPasswordSecure(true);
              }}
            />
          } */
          {...restOfProp}
        />
      </View>
      {error && touched ? (
        <Text style={styleE} {...textErrorProp}>
          {error}
        </Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#79747E",
    margin: 10,
    padding: 10,
  },
  errorMessage: {
    color: "red",
    marginLeft: 10,
  },
});

export default InputContainer;
