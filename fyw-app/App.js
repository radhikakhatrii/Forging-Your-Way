import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import CounsellorDashboard from "./components/counsellor-dashboard";
import Login from "./components/login";
import Signup from "./components/signup";
import StudentDashboard from "./components/student-dashboard";
import { firebase } from "./config";
import Universities from "./components/universities";
import MainPage from "./components/main_page";
import Webinars from './components/webinars';
// import Calendar from "./components/calendar";
console.log(firebase);

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userType, setUserType] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserType(doc.data().userType);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleSignup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={MainPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup">
          {(props) => <Signup {...props} handleSignup={handleSignup} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      {userType === "Counsellor" ? (
        <Stack.Screen name="Counsellor Dashboard" component={CounsellorDashboard} />
      ) : (
        <Stack.Screen name="Student Dashboard" component={StudentDashboard} />
      )}
      <Stack.Screen name="Universities" component={Universities} />
      <Stack.Screen name="Webinars" component={Webinars} />
      <Stack.Screen name="Logout" component={Login} />
      
      {/* <Stack.Screen name="Calendar" component={Calendar} /> */}
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
});
