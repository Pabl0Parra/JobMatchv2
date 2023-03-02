import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import DisplayContainer from "../components/DisplayContainer";
import { SelectList } from "react-native-dropdown-select-list";
import theme from "../theme";
import { UserLoginContex } from "../context/UserDataContext";
import { useNavigation } from "@react-navigation/core";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { db, mainCollection, postCollection } from "../firebase/credentials";

const { text, colors } = theme;
const defaultSelected = { seniority: "", roleWanted: "" };

const Filters = () => {
  const [filterSettings, setFilterSettings] = useState({});
  const [vacantList, setVacantList] = useState([]);
  const [seniorityList, setSeniorityList] = useState([]);
  const [selected, setSelected] = useState(defaultSelected);
  const { userData, setUserData } = useContext(UserLoginContex);

  const navigation = useNavigation();
  let setOfVacant = new Set();
  let vacant
  let seniority = ["Todos", "Junior", "Semi-Senior", "Senior"];
/*   let setOfSeniority = new Set()
  let array */

  useEffect(() => {
    const getOptions = async () => {
      if (userData.worker){
        const vacantOptions = await getDocs(
          query(collection(db, postCollection), where("roleWanted", "!=", ""))
        );
        vacantOptions.forEach((doc) => setOfVacant.add(doc.data().roleWanted));
        /*   console.log(vacant) */
        vacant=Array.from(setOfVacant);
        vacant.unshift("Todos")
        setVacantList(vacant);
      } else {
        const vacantOptions = await getDocs(
          query(collection(db, mainCollection), where("userRole", "!=", ""))
        );
        vacantOptions.forEach((doc) => setOfVacant.add(doc.data().userRole));
        /*   console.log(vacant) */
        vacant=Array.from(setOfVacant);
        vacant.unshift("Todos")
        setVacantList(vacant);
      }

/*       const seniorityOptions = await getDocs(
        query(collection(db, mainCollection), where("seniority", "!=", ""))
      );
      seniorityOptions.forEach((doc) => setOfSeniority.add(doc.data().seniority));

      array=Array.from(setOfSeniority);
      array.unshift("Todos") */
      setSeniorityList(seniority);
    };

    getOptions();
  }, []);

  return (
    <DisplayContainer style={{ justifyContent: "flex-start", marginTop: 15 }}>
      <View style={{ minHeight: "50%", position: "relative" }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={text.descriptionItem}>Puesto</Text>
          <SelectList
            setSelected={(val) => setSelected({ ...selected, roleWanted: val })}
            data={vacantList}
            save="value"
            placeholder="Seleccione una opción"
            search={false}
            maxHeight={200}
            boxStyles={{ width: 250, borderColor: `${colors.secondary}` }}
            inputStyles={{ color: `${colors.text}`, fontWeight: "bold" }}
            dropdownStyles={{ borderColor: `${colors.secondary}` }}
            dropdownTextStyles={{ color: `${colors.text}` }}
            defaultOption={{ key: "Todos", value: "Todos" }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={text.descriptionItem}>Seniority</Text>
          <SelectList
            setSelected={(val) => setSelected({ ...selected, seniority: val })}
            data={seniorityList}
            save="value"
            placeholder="Seleccione una opción"
            search={false}
            maxHeight={200}
            boxStyles={{ width: 250, borderColor: `${colors.secondary}` }}
            inputStyles={{ color: `${colors.text}`, fontWeight: "bold" }}
            dropdownStyles={{ borderColor: `${colors.secondary}` }}
            dropdownTextStyles={{ color: `${colors.text}` }}
            defaultOption={{ key: "Todos", value: "Todos" }}
          />
        </View>
      </View>
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          flexWrap: "wrap",
          minHeight: 100,
        }}
      >
        {selected.roleWanted && (
          <Text style={styles.tag}>{selected.roleWanted}</Text>
        )}
        {selected.seniority && (
          <Text style={styles.tag}>{selected.seniority}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => {
          setUserData({
            ...userData,
            filter: {
              seniority: selected.seniority,
              roleWanted: selected.roleWanted,
            },
          });
          navigation.goBack();
        }}
      >
        <Text style={styles.textButton}>Filtrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.noFilterButton}
        onPress={() => {
          setUserData({
            ...userData,
            filter: defaultSelected,
          });
          setSelected(defaultSelected);
        }}
      >
        <Text style={colors.secondary}>Quitar Filtros</Text>
      </TouchableOpacity>
    </DisplayContainer>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    width: 150,
    height: 50,
    backgroundColor: `${colors.secondary}`,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  noFilterButton: {
    width: 150,
    height: 50,
    color: `${colors.secondary}`,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  textButton: {
    color: `${colors.background}`,
  },
  tag: {
    margin: 4,
    padding: 10,
    backgroundColor: "#84FFFF",
    color: "#525252",
    borderRadius: 8,
    textAlign: "center",
  },
});

export default Filters;
