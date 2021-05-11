import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropdownAlert from "react-native-dropdownalert";
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
	// const [retrieveData, setRetrieveData] = useState([]);

	const saveData = async () => {
		if (task !== null && task !== "") {
			let userTask = {
				task,
				key: Math.floor(Math.random() * 10) + 1,
			};

			if (task.length === 0) {
				this.dropDownAlertRef.alertWithType("error", "Error", "Invalid task.");
			} else {
				const arrData = [userTask];
				const storedData = await AsyncStorage.getItem("user");
				const storedDataParsed = JSON.parse(storedData);
				setData(storedDataParsed);

				let newData = [];

				if (storedData === null) {
					// save
					await AsyncStorage.setItem("user", JSON.stringify(arrData));
				} else {
					newData = [userTask, ...storedDataParsed];
					await AsyncStorage.setItem("user", JSON.stringify(newData));
				}

				Keyboard.dismiss();
				setTask("");
				// this.dropDownAlertRef.alertWithType(
				// 	"success",
				// 	"Success",
				// 	"Task saved successfully."
				// );
			}
		} else {
			setTimeout(() => {
				// this.dropDownAlertRef.alertWithType(
				// 	"error",
				// 	"Error",
				// 	"Please fill the field"
				// );
			}, 1000);
		}
	};

	const retrieveData = async () => {
		try {
			const valueString = await AsyncStorage.getItem("user");
			const value = JSON.parse(valueString);
			setData(value);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		// setRetrieveData(getData());
		// AsyncStorage.clear();
		retrieveData();
	});

	const handleAddTask = async () => {
		try {
			Keyboard.dismiss();
			setTaskItems([...taskItems, task]);
			// await saveData();
		} catch (err) {
			console.log(err);
		}
	};

	// const saveData = async () => {
	// 	const todosObj = taskItems;

	// 	const storedData = await AsyncStorage.getItem("todos");
	// 	const storedDataParsed = JSON.parse(storedData);
	// 	console.log("storedDataParsed", storedDataParsed);

	// 	let newData = [];
	// 	if (storedData === null) {
	// 		// save
	// 		await AsyncStorage.setItem("todos", JSON.stringify(todosObj));
	// 		console.log(await AsyncStorage.getItem("todos", JSON.parse(todosObj)));
	// 		AsyncStorage.clear();
	// 	} else {
	// 		newData = [...storedDataParsed, ...todosObj];
	// 		await AsyncStorage.setItem("todos", JSON.stringify(newData));
	// 	}
	// 	setData(newData);
	// 	Keyboard.dismiss();
	// };

	const storeData = async (value) => {
		try {
			console.log("value from argument", value);

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
	};

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("todos");
			console.log("jsonValue", JSON.parse(jsonValue));
			// return jsonValue != null ? JSON.parse(jsonValue) : null;
			setRetrieveData(JSON.parse(jsonValue));
		} catch (err) {
			// error reading value
			if (err) console.log(err);
		}
	};

	const completed = async (index) => {
		let itemsCopy = [...data];
		const deletedItem = delete itemsCopy[0]["key"] === index;
		console.log("BEFORE", itemsCopy);
		if (itemsCopy[0]["key"] === index) {
			delete itemsCopy[0];
		}
		delete itemsCopy[0]["key"] === index;
		console.log("AFTER", itemsCopy);
		setTaskItems(itemsCopy);
		setData(itemsCopy);
		await AsyncStorage.setItem("key", JSON.stringify(itemsCopy));

		// removeValue(deletedItem);
	};
	const removeValue = async (deletedItem) => {
		try {
			await AsyncStorage.removeItem("todos", deletedItem);
		} catch (err) {
			// remove error
			if (err) console.log(err);
		}

		console.log("Done.");
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
						{data === null ? (
							<Text> No todos yet!</Text>
						) : (
							data.map((value, key) => {
								return (
									<TouchableOpacity
										key={key}
										onPress={() => completed(value.task)}
									>
										<Task text={value.task} />
									</TouchableOpacity>
								);
							})
						)}
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

				<TouchableOpacity onPress={() => saveData()}>
					{/* () => handleAddTask() */}
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
			{/* <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} /> */}
			{/* <StatusBar style="auto" /> */}
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
