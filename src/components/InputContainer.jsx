import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import theme from "../theme";

const {text, colors} = theme

const InputContainer = ({
  value,
  placeholder,
  styleContainer,
  styleError,
  stylePlaceholder,
  touched,
  error,
  textErrorProp,
  showHidePassword,
  ...restOfProp
}) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(showHidePassword);

  return (
    <>
      <View>
        <TextInput
          onKeyPress={(e) => console.log(e)}
          style={[
            styles.container,
            {
              borderWidth: value?.length ? 1.8 : 1.2,
              borderColor: value?.length ? colors.secondary : "gray",
              color: value?.length ? colors.secondary : "gray",
              fontWeight: value?.length ? "600" : "300",
            },
            styleContainer
          ]}
          placeholder={placeholder}
          autoCorrect={false}
          secureTextEntry={isPasswordSecure}
          value={value}
          {...restOfProp}
        />
        {showHidePassword ? (
          <>
            <TouchableOpacity
              style={styles.eyeBox}
              onPress={() => setIsPasswordSecure(!isPasswordSecure)}
            >
              <Entypo
                name={isPasswordSecure ? "eye" : "eye-with-line"}
                size={26}
                color={isPasswordSecure ? "#192B65" : "gray"}
              />
            </TouchableOpacity>
          </>
        ) : null}
        {value?.length ? (
          <View style={[styles.placeholder, stylePlaceholder]}>
            <Text style={{ fontWeight: "600" }}>{placeholder}</Text>
          </View>
        ) : null}
      </View>
      {error && touched ? (
        <Text style={[styles.errorMessage, styleError]} {...textErrorProp}>
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
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  placeholder: {
    position: "absolute",
    left: 20,
    backgroundColor: "white",
    paddingHorizontal: 4,
  },
  errorMessage: {
    color: "red",
    marginLeft: 10,
  },
  eyeBox: {
    position: "absolute",
    right: 20,
    top: 22,
  },
});

export default InputContainer;
