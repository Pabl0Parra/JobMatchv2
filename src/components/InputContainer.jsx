import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const InputContainer = ({
  value,
  placeholder,
  styleContainer,
  styleError,
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
          style={[
            styles.container,
            styleContainer,
            {
              borderWidth: value.length ? 1.8 : 1.2,
              borderColor: value.length ? "#192B65" : "gray",
              color: value.length ? "#192B65" : "gray",
              fontWeight: value.length ? "600" : "300",
            },
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
        {value.length ? (
          <View style={styles.placeholder}>
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
    padding: 10
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
