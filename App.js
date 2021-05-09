import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Task from "./components/tasks";

export default function App() {
	const [task, setTask] = useState("");

	const handleAddTask = () => {
		console.log(task);
	};

	return (
		<View style={styles.container}>
			{/* Today's Tasks */}
			<View style={styles.textWrapper}>
				<Text style={styles.sectionTitle}>Today's Tasks!</Text>
				{/* Tasks */}
				<View style={styles.items}>
					<Task text="Task 1" />
					<Task text="Task 2" />
				</View>
			</View>

			{/* write a task */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "android" ? "padding" : "height"}
				style={styles.writeTaskWrapper}
			>
				<TextInput style={styles.input} placeholder="write a task" />
				<TouchableOpacity>
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E8EAED",
	},
	textWrapper: {
		paddingTop: 80,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	items: {
		marginTop: 30,
	},
	writeTaskWrapper: {
		position: "absolute",
		bottom: 60,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: "#FFF",
		borderRadius: 60,
		borderColor: "#C0C0C0",
		borderWidth: 1,
		width: 250,
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: "#FFF",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#C0C0C0",
		borderWidth: 1,
	},
	addText: {
		fontSize: 24,
	},
});
