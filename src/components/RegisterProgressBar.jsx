import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RegisterProgressBar = ({ currentStep, numSteps }) => {
  const steps = Array.from({ length: numSteps }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <View
          key={step}
          style={
            step <= currentStep ? [styles.activeStep] : [styles.inactiveStep]
          }
        >
          <Text
            style={
              step <= currentStep
                ? [styles.stepText, { color: "#84FFFF" }]
                : [styles.stepText, { color: "#091D5C" }]
            }
          >
            {step}
          </Text>
        </View>
      ))}
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 38,
    marginTop: 116,
    position: "relative",
  },
  activeStep: {
    backgroundColor: "#091D5C",
    color: "#84FFFF",
    borderRadius: 20,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveStep: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#091D5C",
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    color: "#84FFFF",
    fontSize: 14,
  },
  line: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#091D5C",
    zIndex: -1,
  },
});

export default RegisterProgressBar;
