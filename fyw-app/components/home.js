const HomeScreen = ({ navigation }) => {
	return <Button title="Go to Jane's profile" onPress={() => navigation.navigate("Profile", { name: "Jane" })} />;
};
