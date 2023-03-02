import { useFormik } from "formik";
import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import { UserLoginContex } from "../context/UserDataContext";
import updateDataUser from "../firebase/functions/updateDataUser";
import getUserDataDB from "../firebase/functions/getUserDataDB";
import theme from "../theme";
import InputContainer from "./InputContainer";
import ReusableButton from "./ReusableButton";
import * as yup from "yup";

const { colors, text } = theme;

const MainDataEditingForm = ({ setShowModal, showModal, inputArray }) => {
  const { userData, setUserData } = useContext(UserLoginContex);

  const yupValText = yup
    .string()
    .required("Este campo es requerido")
    .matches(/^[a-zA-Z\s]*$/, "Solo se permiten letras y espacios")

  const formik = useFormik({
    initialValues: inputArray.reduce(
      (acc, input) => ({
        ...acc,
        [input.name]: userData[`${input.name}`],
      }),
      {}
    ),
    onSubmit: async (values) => {

      try {
        await updateDataUser(values, userData.worker? userData.id : userData.userId);
        const res = await getUserDataDB(userData.worker? userData.id : userData.userId);

        if (res) {
          setUserData(res);
          setShowModal(false);
        } else {
          console.log("error al cargar los datos");
        }
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object().shape(
      inputArray.reduce(
        (acc, input) => ({
          ...acc,
          [input.name]: yupValText,
        }),
        {}
      )
    ),
  });

  const resetValues = () => {
    inputArray.forEach(
      (input) => (formik.values[`${input.name}`] = userData[`${input.name}`])
    );
  };

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0}
      style={{ justifyContent: "center", alignItems: "center" }}
      isVisible={showModal}
      onBackButtonPress={(e) => {
        setShowModal(false);
        resetValues();
      }}
      onBackdropPress={(e) => {
        setShowModal(false);
        resetValues();
      }}
    >
      <View style={[styles.modalContainer]}>
        {inputArray.map((inp) => (
          <View key={inp.name}>
            <Text style={[text.text16, {color: colors.secondary, fontWeight: "700"}]}>{inp.title} </Text>
            <InputContainer
              style={[styles.inputContainer]}
              value={formik.values[`${inp.name}`]}
              error={formik.errors[`${inp.name}`]}
              touched={formik.touched[`${inp.name}`]}
              onChangeText={formik.handleChange(inp.name)}
              stylePlaceholder={{ backgroundColor: "rgba(255,255,255,1" }}
            />
          </View>
        ))}
        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 15 }}
        >
          <ReusableButton
            styleContainer={[{ width: 130 }]}
            innerText={"Aceptar"}
            onPress={() => {
              formik.handleSubmit();
            }}
          />
          <View style={{ width: 15 }}></View>
          <ReusableButton
            onPress={() => {
              setShowModal(false);
              resetValues();
            }}
            styleContainer={[{ backgroundColor: "#eee", width: 130 }]}
            styleText={{ color: "gray" }}
            innerText={"Cancelar"}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MainDataEditingForm;

const styles = StyleSheet.create({
  modalContainer: {
    position: "relative",
    backgroundColor: "#ddd",
    borderRadius: 20,
    width: "100%",
    padding: 20,
    borderColor: "#aaa",
    borderWidth: 1,
  },
  inputContainer: {
    backgroundColor: colors.primary,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: "#aaa",
    borderWidth: 1,
    height: 40,
    paddingLeft: 8,
  },
});
