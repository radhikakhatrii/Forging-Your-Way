import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import {firebase} from './config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import { Button } from 'react-native-paper';
import { StudentDashboard, CounsellorDashboard } from './components/dashboard';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      firebase.firestore().collection("users").doc(user.uid).get()
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

  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleSignup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  if (initializing) return null;

  if (!user){
    return (
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' >
          {props => <Signup {...props} handleSignup={handleSignup} />}
        </Stack.Screen>
      </Stack.Navigator>
    )}
    return (
      <Stack.Navigator>
        {userType === "counsellor" ? (
          <Stack.Screen name='CounsellorDashboard' component={CounsellorDashboard} />
        ) : (
          <Stack.Screen name='StudentDashboard' component={StudentDashboard} />
        )}
        <Stack.Screen name='Logout' component={Login} />
      </Stack.Navigator>
    );
    
}


export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
});
