import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { StudentDashboard, CounsellorDashboard } from './student-dashboard';
import { firebase } from '../config';

const Signup = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordconfirm, setPasswordConfirm] = React.useState("");
    const [userType, setUserType] = React.useState('');

    const handleSignup = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Store the user's information, including userType, in Firebase
                firebase
                    .firestore()
                    .collection('users')
                    .doc(user.uid)
                    .set({
                        name: name,
                        email: email,
                        userType: userType,
                    })
                    .then(() => {
                        console.log('User successfully registered with userType:', userType);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    };

    return (
        <>
            <TextInput style={styles.textbox}
                label="Full Name"
                value={name}
                mode='outlined'
                onChangeText={text => setName(text)}
            />

            <TextInput style={styles.textbox}
                label="Email"
                value={email}
                mode='outlined'
                onChangeText={text => setEmail(text)}
            />

            <TextInput style={styles.textbox}
                label="Password"
                value={password}
                mode='outlined'
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />

            <TextInput style={styles.textbox}
                label="Confirm Password"
                value={passwordconfirm}
                mode='outlined'
                onChangeText={text => setPasswordConfirm(text)}
                secureTextEntry
            />

            <View style={styles.viewcheck}>
                <RadioButton.Item
                    label="I am a Student"
                    value="Student"
                    status={userType === 'Student' ? 'checked' : 'unchecked'}
                    onPress={() => setUserType('Student')}
                />
                <RadioButton.Item
                    label="I am a Counsellor"
                    value="Counsellor"
                    status={userType === 'Counsellor' ? 'checked' : 'unchecked'}
                    onPress={() => setUserType('Counsellor')}
                />
            </View>

            <Button style={styles.button}
                onPress={handleSignup}
                mode="contained">Sign Up</Button>
        </>
    );
};

export default Signup;

const styles = StyleSheet.create({
    textbox: {
      margin: 10,
    },
    button: {
        margin: 10,
    },
    text: {
        margin: 10,
        textAlign: 'center',
    },
    viewcheck: {
        margin: 5,
        alignItems: 'center',
    },
    radio: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
    }
});
