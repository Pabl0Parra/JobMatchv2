import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import InputContainer from "./InputContainer";

const InputForm = ({ fields, onSubmit, questionText, requestText }) => {
  const navigation = useNavigation();

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
            .min(6, `Contraseña debe tener al menos 6 caracteres`);
          break;
        case "text":
          yupVal = yup.string().required("Este campo es requerido");
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
        <View style={styles.container}>
          <Text style={styles.questionText}>{questionText}</Text>
          <Text style={styles.requestText}>{requestText}</Text>
          {fields.map((field) => (
            <View key={`${field.name}Input`}>
              <InputContainer
                value={values[field.name]}
                placeholder={field.label}
                onChangeText={handleChange(`${field.name}`)}
                touched={touched[field.name]}
                error={errors[field.name]}
                showHidePassword={field.type === "password"}
              />
              {field.recoverPassword ? (
                <Text
                  style={styles.textRecoverPassword}
                  onPress={() => navigation.navigate("ResetPassword")}
                >
                  ¿Has olvidado tu contraseña?
                </Text>
              ) : null}
            </View>
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
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  questionText: {
    color: "#192B65",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  requestText: {
    color: "#192B65",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    width: 280,
    height: 38,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    marginTop: 14,
    cursor: "pointer",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  textRecoverPassword: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#192B65",
    fontWeight: "bold",
  },
});

export default InputForm;
