import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import theme from "./src/theme";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { auth, db } from "./src/firebase/credentials";
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
import Loading from "./src/screens/Loading";
import LandingPage from "./src/screens/LandingPage";
import MatchModal from "./src/screens/MatchModal";
import { getDoc, doc } from "@firebase/firestore";
import {
  UserDataContext,
  UserDataContextProvider,
  UserLoginContex,
} from "./src/context/UserDataContext";

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
        const docRef = doc(db, "HomeTest", userFirebase.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserData(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
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
                <Stack.Screen
                  name="Details"
                  component={Details}
                  options={{
                    headerShown: true,
                    headerTitle: "Detalles del perfil",
                  }}
                />
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
