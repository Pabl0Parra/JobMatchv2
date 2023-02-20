import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import InputContainer from "./InputContainer";

const InputForm = ({
  fields,
  onSubmit,
  questionText,
  requestText,
  buttonText,
  styleText,
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
        case "verifyPassword":
          yupVal = yup
          .string()
          .oneOf([yup.ref("password")], "Contraseña no coincide")
          .required("Este campo es requerido")
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
                showHidePassword={field.type === "password" || field.type === "verifyPassword"}
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
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    Object.entries(errors)?.length === 0 &&
                    fields.some((field) => values[field.name] !== "")
                      ? "#091D5C"
                      : "#D9D9D9",
                },
              ]}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      Object.entries(errors)?.length === 0 &&
                      fields.some((field) => values[field.name] !== "")
                        ? "#84FFFF"
                        : "#666666",
                  },
                ]}
              >
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
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
    textAlignVertical: "center",
    width: 280,
    height: 38,
    borderRadius: 25,
    marginTop: 14,
    cursor: "pointer",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
  },
  textRecoverPassword: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#192B65",
    fontWeight: "bold",
  },
});

export default InputForm;
