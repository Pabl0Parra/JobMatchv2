import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import theme from "./src/theme";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { auth } from "./src/firebase/credentials";
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

const Stack = createNativeStackNavigator();

const RegisterStack = createNativeStackNavigator();

const RegisterStackScreen = () => (
  <RegisterStack.Navigator screenOptions={{ headerShown: false }}>
    <RegisterStack.Screen name="ChooseUserName" component={ChooseUserName} />
    <RegisterStack.Screen name="ChooseUserType" component={ChooseUserType} />
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
  const [user, setUser] = useState(undefined);
  const [onLandingPage, setOnLandingPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOnLandingPage(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {onLandingPage ? (
          <Stack.Screen name="LandingPage" component={LandingPage} />
        ) : user !== undefined ? (
          user === null ? (
            <>
              <Stack.Screen
                name="RegisterStack"
                component={RegisterStackScreen}
              />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
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
            </>
          )
        ) : (
          <Stack.Screen name="Loading" component={Loading} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
