import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ReusableButton = ({
  styleContainer,
  styleText,
  enabled = true,
  innerText,
  ...restOfProp
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: enabled ? "#091D5C" : "#D9D9D9",
        },
        ,
        styleContainer,
      ]}
      {...restOfProp}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color:
              enabled ? "#84FFFF" : "#666666",
          },
          styleText,
        ]}
      >
        {innerText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    textAlignVertical: "center",
    width: 280,
    height: 38,
    borderRadius: 25,
    cursor: "pointer",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
  },
});

export default ReusableButton;
