import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import theme from "./src/theme";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { auth } from "./src/firebase/credentials";
import { onAuthStateChanged } from "@firebase/auth";
import BottomTab from "./src/components/BottomTab";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

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
        {user === null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) 
        : 
        <BottomTab />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
