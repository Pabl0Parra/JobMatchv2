import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Constants from "expo-constants";

const HelpAndSupport = () => {
  return (
    <View style={styles.container}>
      <ScrollView >
        <Text style={styles.heading}>
          ¡Bienvenido al centro de ayuda y soporte técnico de nuestra aplicación
          de búsqueda de empleo!
        </Text>
        <Text style={styles.text}>
          Aquí encontrará información detallada sobre cómo utilizar nuestra
          aplicación y solucionar problemas técnicos que pueda enfrentar al
          utilizarla.
        </Text>

        <Text style={styles.subheading}>1. Descarga e instalación:</Text>
        <Text style={styles.text}>
          - Nuestra aplicación está disponible en las tiendas de aplicaciones de
          iOS y Android. Busca "Nombre de la aplicación" en la tienda de
          aplicaciones y descárgala e instálala en tu dispositivo.
        </Text>

        <Text style={styles.subheading}>2. Registro y configuración:</Text>
        <Text style={styles.text}>
          - Al abrir la aplicación por primera vez, deberá registrarse o iniciar
          sesión si ya tiene una cuenta.
        </Text>
        <Text style={styles.text}>
          - Una vez que haya iniciado sesión, podrá configurar su perfil y
          agregar información relevante, como su experiencia laboral y
          habilidades.
        </Text>

        <Text style={styles.subheading}>3. Uso de la aplicación:</Text>
        <Text style={styles.text}>
          - La aplicación funciona de manera similar a Tinder, donde se le
          presentarán perfiles de empresas y trabajadores. Desliza a la derecha
          para indicar interés en un perfil y a la izquierda para pasar al
          siguiente.
        </Text>
        <Text style={styles.text}>
          - Si un perfil de empresa y un trabajador indican interés mutuo, se
          considera un "match" y podrán conectarse para discutir oportunidades
          de trabajo.
        </Text>
        <Text style={styles.text}>
          - También puede utilizar la función de búsqueda para buscar perfiles
          específicos que cumplan con sus criterios de búsqueda.
        </Text>

        <Text style={styles.subheading}>4. Solución de problemas:</Text>
        <Text style={styles.text}>
          - Si experimenta algún problema técnico con la aplicación, asegúrese
          de estar utilizando la última versión de la aplicación y la última
          versión de su sistema operativo.
        </Text>
        <Text style={styles.text}>
          - Si el problema persiste, comuníquese con nuestro equipo de soporte
          técnico a través de nuestro correo electrónico de soporte:
          soporte@nombredelaapp.com. Incluya una descripción detallada del
          problema, así como cualquier captura de pantalla o información
          adicional relevante.
        </Text>
        <Text style={styles.text}>
          - También puede visitar nuestra página de preguntas frecuentes (FAQ)
          para obtener respuestas a preguntas comunes que nuestros usuarios han
          planteado.
        </Text>

        <Text style={styles.text}>
          Gracias por utilizar nuestra aplicación de búsqueda de empleo.
          ¡Estamos aquí para ayudarte en todo lo que necesites!
        </Text>
      </ScrollView>
    </View>
  );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
