import React from "react";
// import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import InputForm from "../components/InputForm";

const ChooseCountry = ({ navigation }) => {
  return (
    <InputForm
      fields={[
        { label: "País", value: "" },
        { label: "Ciudad", value: "" },
      ]}
      onSubmit={(values) => {
        navigation.navigate("ChooseUserName", {
          country: values[0],
          city: values[1],
        });
      }}
      questionText="Te damos la bienvenida,"
      requestText="Introduce los siguientes datos:"
    />
  );
};

// <View style={styles.container}>
//   <Text style={styles.welcomeText}>Te damos la bienvenida,</Text>
//   <Text style={styles.requestText}>Introduce los siguientes datos:</Text>
//   <TextInput
//     style={styles.input}
//     value={country}
//     placeholder="País"
//     onChangeText={(text) => setCountry(text)}
//   />
//   <TextInput
//     style={styles.input}
//     value={city}
//     placeholder="Ciudad"
//     onChangeText={(text) => setCity(text)}
//   />
//   <Button
//     title="Siguiente"
//     onPress={() => navigation.navigate("CompanyName", { country, city })}
//     style={styles.nextButton}
//   />
// </View>
//   );
// };

export default ChooseCountry;
