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
import { db } from "../firebase/credentials";

const { text, colors } = theme;
const defaultSelected = { seniority: "", roleWanted: "" };


const Filters = () => {
  const [filterSettings, setFilterSettings] = useState({});
  const [vacantList, setVacantList] = useState([]);
  const [seniorityList, setSeniorityList] = useState([]);
  const [selected, setSelected] = useState(defaultSelected);
  const { userData, setUserData } = useContext(UserLoginContex);

  const navigation = useNavigation();

  useEffect(() => {
    let vacant = [{key:"Todos", value:"Todos"}];
    let seniority = [{key:"Todos", value:"Todos"}];
    const getOptions = async () => {
      const vacantOptions = await getDocs(
        query(collection(db, "HomeTest"), where("vacant", "!=", ""))
      );
      vacantOptions.forEach((doc) => vacant.push({key: doc.data().vacant, value: doc.data().vacant}));
      const seniorityOptions = await getDocs(
        query(collection(db, "HomeTest"), where("seniority", "!=", ""))
      );
      seniorityOptions.forEach((doc) => seniority.push({key: doc.data().seniority, value: doc.data().seniority}));
      //TODO: Obtener lista sin items repetidos, ya sea con un set o crear alguna funcion que elimine los elementos repetidos
    };

    getOptions();
    setVacantList(vacant);
    setSeniorityList(seniority);
  }, []);

  return (
    <DisplayContainer style={{ justifyContent: "flex-start", marginTop: 15 }}>
      <View style={{ minHeight: "50%", position:"relative" }}>
        <View style={{marginVertical:10}}>
          <Text style={text.descriptionItem}>Puesto</Text>
          <SelectList
            setSelected={(val) => setSelected({ ...selected, roleWanted: val })}
            data={vacantList}
            save="value"
            placeholder="Seleccione una opción"
            search={false}
            maxHeight={200}
            boxStyles={{width:250, borderColor: `${colors.secondary}`,}}
            inputStyles={{color:`${colors.text}`, fontWeight:"bold"}}
            dropdownStyles={{borderColor: `${colors.secondary}`}}
            dropdownTextStyles={{color:`${colors.text}`, }}
            defaultOption={{key:"Todos", value:"Todos"}}
          />
        </View>
        <View style={{marginVertical:10}}>
          <Text style={text.descriptionItem}>Seniority</Text>
          <SelectList
            setSelected={(val) => setSelected({ ...selected, seniority: val })}
            data={seniorityList}
            save="value"
            placeholder="Seleccione una opción"
            search={false}
            maxHeight={200}
            boxStyles={{width:250, borderColor: `${colors.secondary}`,}}
            inputStyles={{color:`${colors.text}`, fontWeight:"bold"}}
            dropdownStyles={{borderColor: `${colors.secondary}`}}
            dropdownTextStyles={{color:`${colors.text}`, }}
            defaultOption={{key:"Todos", value:"Todos"}}
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
            ...userData, filter:{
              seniority: selected.seniority,
              roleWanted: selected.roleWanted,
            }
            
            
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
            ...userData,filter:defaultSelected })
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
