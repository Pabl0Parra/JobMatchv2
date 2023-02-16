import { Formik } from "formik";
import * as yup from "yup";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import InputContainer from "./InputContainer";

const InputForm = ({ fields, onSubmit, questionText, requestText }) => {
  const generateInitialValues = () => {
    return fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: "",
      }),
      {}
    );
  };

  const validationSchema = () => {

    return fields.reduce((acc, field) => {

      let yupVal;

      switch (field.type) {
        case "email":
          yupVal = yup
            .string()
            .required("Este campo es requerido")
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              "Formato de correo inválido"
            );
          break;
        case "password":
          yupVal = yup
            .string()
            .required("Este campo es requerido")
            .min(
              6,
              `Contraseña debe tener al menos 6 caracteres`
            );
          break;
          case "text":
          yupVal = yup
            .string()
            .required("Este campo es requerido")
          break;
      }

      return {
        ...acc,
        [field.name]: yupVal,
      };
    }, {});
  };

  return (
    <Formik
      initialValues={generateInitialValues()}
      validationSchema={yup.object().shape(validationSchema())}
      onSubmit={(obj) => {
        onSubmit(fields.map((field) => obj[field.name]));
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={styles.questionText}>{questionText}</Text>
          <Text style={styles.requestText}>{requestText}</Text>
          {fields.map((field) => (
            <InputContainer
              key={`${field.name}Input`}
              value={values[field.name]}
              placeholder={field.label}
              onChangeText={handleChange(`${field.name}`)}
              touched={touched[field.name]}
              error={errors[field.name]}
            />
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit} /* 
            disabled={fields.some((field) => !fieldValues[field.name])} */
          >
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  questionText: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  },
  requestText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center"
  },
  button: {
    justifyContent: "center",
    width: 288,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    marginTop: 40,
    cursor: "pointer",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});

export default InputForm;
