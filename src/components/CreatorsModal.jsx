import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import axios from "axios";
import theme from "../theme";

const { colors } = theme;

const EXCLUDED_MEMBER = "SevindzhRu";
const CONTRIBUTORS_API = `https://api.github.com/repos/No-Country/C9-47-ft-ReactNative/contributors?exclude=${EXCLUDED_MEMBER}`;

const CreatorsModal = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    axios
      .get(CONTRIBUTORS_API)
      .then((response) => {
        setContributors(response.data), setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.title}>Contacto:</Text>
            <FlatList
              data={contributors}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Image
                    source={{ uri: item.avatar_url }}
                    style={styles.avatar}
                  />
                  <Text
                    style={styles.username}
                    onPress={() => Linking.openURL(item.html_url)}
                  >
                    {item.login}
                  </Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => closeModal()}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default CreatorsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
    marginVertical: "20%",
    borderRadius: 28,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginBottom: 10,
  },
  contentContainer: {
    width: "80%",
    marginTop: 20,
  },
  title: {
    color: `${colors.text}`,
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
    alignSelf: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  imageContainer: {
    marginRight: 20,
  },
  username: {
    color: `${colors.text}`,
    fontSize: 30,
    fontWeight: "500",
  },
  button: {
    backgroundColor: `${colors.secondary}`,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 10,
    elevation: 2,
    marginBottom: 60,
  },
  buttonText: {
    color: `${colors.details}`,
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },
});
