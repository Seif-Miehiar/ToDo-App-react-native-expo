import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native";
import Task from "./components/tasks";

export default function App() {
	const [task, setTask] = useState("");
	const [taskItems, setTaskItems] = useState([]);
	const [data, setData] = useState([]);

	// useEffect(() => {
	// 	async function fetch() {
	// 		let newData = await getData();
	// 		// console.log("test newData ", JSON.parse(newData));
	// 		// Object.values(JSON.parse(newData));
	// 		// setData(newData);
	// 	}
	// 	fetch();
	// 	// 	console.log("newData", newData);
	// 	// 	newData = Object.values(newData);
	// 	// 	setData(newData);
	// }, [taskItems]);

	const handleAddTask = async () => {
		try {
			Keyboard.dismiss();
			setTaskItems([...taskItems, task], () => {
				storeData(Object.assign({}, taskItems));
				setData(Object.values(getData()));
			});
			// .then(() => {
			// console.log("testing stored task items ", Object.assign({}, taskItems));
			// });
			// if (taskItems) {

			// }
			// setData(getData());
			setTask(null);
		} catch (err) {
			console.log(err);
		}
		// await storeData(Object.assign({}, taskItems));
		// setData(Object.values(await getData()));
	};
	const storeData = async (value) => {
		try {
			console.log("value from argument", value);

			// const obj = Object.assign({}, value);
			const obj1 = JSON.stringify(value);
			console.log("obj1 stringified", obj1);
			await AsyncStorage.setItem("todos2", obj1, (err) => {
				if (err) {
					console.log("err in setItem callback");
					throw err;
				}
				console.log("success");
			});
		} catch (err) {
			// saving error
			if (err) console.log("error from catch is: " + err);
		}
		// console.log(setData(Object.values(getData())));
	};

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("todos2");
			console.log("jsonValue", JSON.parse(jsonValue));
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (err) {
			// error reading value
			if (err) console.log(err);
		}
	};

	const completed = (index) => {
		let itemsCopy = [...taskItems];
		itemsCopy.splice(index, 1);
		setTaskItems(itemsCopy, () => {
			console.log("todo item deleted successfully");
		});
	};

	return (
		<View style={styles.container}>
			{/* Today's Tasks */}

			<View style={styles.textWrapper}>
				<Text style={styles.sectionTitle}>Today's Tasks!</Text>
				{/* Tasks */}
				<View style={styles.items}>
					<ScrollView>
						{/* iterate over tasks */}
						{
							(console.log("data before map and render", data),
							data.length ? (
								data.map((item, index) => {
									return (
										<TouchableOpacity
											key={index}
											onPress={() => completed(index)}
										>
											<Task text={item} />
										</TouchableOpacity>
									);
								})
							) : (
								<Text> No todos yet!</Text>
							))
						}
					</ScrollView>
				</View>
			</View>

			{/* write a task */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.writeTaskWrapper}
			>
				<TextInput
					style={styles.input}
					placeholder="write a task"
					value={task}
					onChangeText={(text) => {
						setTask(text);
					}}
				/>

				<TouchableOpacity onPress={() => handleAddTask()}>
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
