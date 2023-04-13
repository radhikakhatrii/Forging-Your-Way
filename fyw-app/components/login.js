import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { firebase } from "../config";
import Signup from "./signup";
import { CounsellorDashboard, StudentDashboard } from "./student-dashboard";

const Login = ({ navigation }) => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [value, setValue] = React.useState("Student");

	loginUser = async (email, password) => {
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password);
			console.log(email);
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<>
			<TextInput
				style={styles.textbox}
				label="Email"
				value={email}
				mode="outlined"
				onChangeText={(text) => setEmail(text)}
			/>

			<TextInput
				style={styles.textbox}
				label="Password"
				value={password}
				mode="outlined"
				onChangeText={(text) => setPassword(text)}
				secureTextEntry={true}
			/>

			<Button onPress={() => loginUser(email, password)} style={styles.button} mode="contained">
				Log In
			</Button>

			<Text style={styles.text} variant="displaySmall">
				Don't have an account?
			</Text>

			<Button title="Signup" onPress={() => navigation.navigate("Signup")} style={styles.button} mode="contained">
				Sign Up
			</Button>
		</>
	);
};

export default Login;

const styles = StyleSheet.create({
	textbox: {
		margin: 10
	},
	button: {
		margin: 10
	},
	text: {
		margin: 10,
		textAlign: "center"
	},
	viewcheck: {
		flexDirection: "row",
		margin: 5,
		alignItems: "center"
	},
	radio: {
		flexDirection: "row",
		padding: 5,
		alignItems: "center"
	}
});
