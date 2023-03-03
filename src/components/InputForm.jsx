import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Text, View, StyleSheet } from "react-native";
import InputContainer from "./InputContainer";
import ReusableButton from "../components/ReusableButton";
import theme from "../theme";

const { colors } = theme;

const InputForm = ({
  fields,
  onSubmit,
  questionText,
  requestText,
  buttonText,
  styleText,
  buttonMarginTop,
}) => {
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
              /^[a-zA-Z0-9._%+-ñÑáéíóúÁÉÍÓÚ]+@[a-zA-Z0-9.-ñÑáéíóúÁÉÍÓÚ]+.[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,}$/,
              "Formato de correo inválido"
            );
          break;
        case "password":
          yupVal = yup
            .string()
            .required("Este campo es requerido")
            .min(8, `Contraseña debe tener al menos 8 caracteres`)
            .max(16,`Contraseña debe tener como máximo 16 caracteres`)
            .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, 
            "Debe contener al menos una mayúscula,\n una minúscula, un dígito");
          break;
        case "verifyPassword":
          yupVal = yup
            .string()
            .oneOf([yup.ref("password")], "Contraseña no coincide")
            .required("Este campo es requerido")
            .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, 
            "Debe contener al menos una mayúscula,\n una minúscula, un dígito");
          break;
        case "text":
          yupVal = yup
            .string()
            .required("Este campo es requerido")
            .matches(/^[a-zA-Z\s\/-\ñ\u00C0-\u00FF]*$/, "Solo se permiten letras y espacios");
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
          {questionText && (
            <Text style={[styles.questionText, styleText?.question]}>
              {questionText}
            </Text>
          )}
          {requestText && (
            <Text style={[styles.requestText, styleText?.request]}>
              {requestText}
            </Text>
          )}
          {fields.map((field, i) => (
            <View key={i}>
              <InputContainer
                value={values[field.name]}
                placeholder={field.label}
                onChangeText={handleChange(`${field.name}`)}
                touched={touched[field.name]}
                error={errors[field.name]}
                showHidePassword={
                  field.type === "password" || field.type === "verifyPassword"
                }
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
          <View>
            <ReusableButton
              innerText={buttonText}
              enabled={
                Object.entries(errors)?.length === 0 &&
                fields.some((field) => values[field.name] !== "")
              }
              styleContainer={{ marginTop: buttonMarginTop }}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 8,
  },
  textRecoverPassword: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#192B65",
    fontWeight: "bold",
  },
});

export default InputForm;
