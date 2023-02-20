import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RegisterProgressBar = ({ currentStep }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((step) => (
        <View
          key={step}
          style={
            step <= currentStep
              ? [styles.activeStep, styles.stepWithBorder]
              : [styles.inactiveStep, styles.stepWithBorder]
          }
        >
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },
  activeStep: {
    backgroundColor: "#2979FF",
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveStep: {
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  stepWithBorder: {
    borderRightWidth: 1,
    borderRightColor: "#D9D9D9",
  },
  stepText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegisterProgressBar;
