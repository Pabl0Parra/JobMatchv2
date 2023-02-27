import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import theme from "./src/theme";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { auth, db, mainCollection} from "./src/firebase/credentials";
import { onAuthStateChanged } from "@firebase/auth";
import BottomTab from "./src/components/BottomTab";
import Details from "./src/screens/Details";
import ChooseUserType from "./src/screens/ChooseUserType";
import ChooseCountry from "./src/screens/ChooseCountry";
import ChooseUserName from "./src/screens/ChooseUserName";
import ChooseCompanyName from "./src/screens/ChooseCompanyName";
import ChooseUserRole from "./src/screens/ChooseUserRole";
import ChooseProfilePicture from "./src/screens/ChooseProfilePicture";
import ChooseRoleWanted from "./src/screens/ChooseRoleWanted";
import ResetPassword from "./src/screens/ResetPassword";
import LandingPage from "./src/screens/LandingPage";
import MatchModal from "./src/screens/MatchModal";
import getUserDataDB from "./src/firebase/functions/getUserDataDB";
import {
  UserDataContextProvider,
  UserLoginContex,
} from "./src/context/UserDataContext";
import Filters from "./src/screens/Filters";
import PostForm from "./src/screens/PostForm";


const Stack = createNativeStackNavigator();

const RegisterStack = createNativeStackNavigator();

const RegisterStackScreen = () => (
  <RegisterStack.Navigator screenOptions={{ headerShown: false }}>
    <RegisterStack.Screen name="ChooseUserType" component={ChooseUserType} />
    <RegisterStack.Screen name="ChooseUserName" component={ChooseUserName} />
    <RegisterStack.Screen name="ChooseCountry" component={ChooseCountry} />
    <RegisterStack.Screen
      name="ChooseCompanyName"
      component={ChooseCompanyName}
    />
    <RegisterStack.Screen name="ChooseUserRole" component={ChooseUserRole} />
    <RegisterStack.Screen
      name="ChooseRoleWanted"
      component={ChooseRoleWanted}
    />
    <RegisterStack.Screen
      name="ChooseProfilePicture"
      component={ChooseProfilePicture}
    />
  </RegisterStack.Navigator>
);

export default function App() {
  /* const {userData, setUserData} = useContext(UserDataContext) */
  const [userData, setUserData] = useState();
  const [onLandingPage, setOnLandingPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOnLandingPage(false);
    }, 3000);
    
    onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        const res = await getUserDataDB(userFirebase.uid);
        if (res) {
          setUserData(res);
        } else {
          console.log("error al obtener los datos")
        }
      } else {
        ("Error de login");
      }
    });

    return () => clearTimeout(timer);
  }, []);
  

  console.log("APP:" + userData?.id);
  return (
    <UserLoginContex.Provider value={{ userData, setUserData }}>
      <UserDataContextProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {onLandingPage ? (
              <Stack.Screen name="LandingPage" component={LandingPage} />
            ) : userData === null || userData === undefined ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen
                  name="RegisterStack"
                  component={RegisterStackScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Main" component={BottomTab} />
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{
                      headerShown: true,
                      headerTitle: "Detalles",
                      headerStyle: { backgroundColor: "#fff" },
                    }}
                  />
                  <Stack.Screen
                    name="Filters"
                    component={Filters}
                    options={{
                      headerShown: true,
                      headerTitle: "Filtrar Puestos",
                      headerStyle: { backgroundColor: "#fff" },
                    }}
                  />
                    <Stack.Screen name="PostForm"
                    component={PostForm}
                    options={{
                      headerShown: true,
                      headerTitle: "Publicar un puesto",
                      headerStyle: { backgroundColor: "#fff" },
                    }}/>
                </Stack.Group>
                <Stack.Group
                  screenOptions={{ presentation: "transparentModal" }}
                >
                  <Stack.Screen name="MatchModal" component={MatchModal} />
                </Stack.Group>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserDataContextProvider>
    </UserLoginContex.Provider>
  );
}
