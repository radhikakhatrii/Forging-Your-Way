import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth, signOut } from 'firebase/auth';
import Login from './login';

const CounsellorDashboard = ({ navigation }) => {
    const handleLogout = async () => {
      try {
        const auth = getAuth();
        await signOut(auth);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text>Counsellor Dashboard</Text>
        <Button style={styles.button} onPress={handleLogout}>
          Log Out
        </Button>
      </View>
    );
  };

export default CounsellorDashboard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginTop: 20,
    },
  });
  