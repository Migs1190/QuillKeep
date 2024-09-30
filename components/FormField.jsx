import { Colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import { TextInput, TouchableHighlight, View } from "react-native";
import { GlobalContext } from "../context/GlobalProvider";

const FormField = ({
	value,
	label,
	placeholder,
	handleWrite = (f) => f,
	isDisabled,
}) => {
	const { mode } = useContext(GlobalContext);
	const [showPass, setShowPass] = useState(false);
	return (
		<View className="h-14 bg-primary dark:bg-mine-shaft flex-row rounded-lg my-2 border-[1px] border-gray-200 focus:border-secondary overflow-hidden">
			<View className="flex-1">
				<TextInput
					value={value}
					className={`px-4 h-full dark:text-primary ${isDisabled && "opacity-50"}`}
					placeholder={placeholder}
					placeholderTextColor={Colors[mode].text}
					onChangeText={(value) =>
						handleWrite((prev) => ({ ...prev, [label.toLowerCase()]: value }))
					}
					secureTextEntry={label === "Password" && !showPass}
					editable={!isDisabled}
				/>
			</View>
			{label === "Password" && (
				<TouchableHighlight
					className="px-4 bg-secondary py-2 justify-center items-center"
					underlayColor={Colors.tintShade}
					onPress={() => setShowPass(!showPass)}
				>
					<Ionicons
						name={showPass ? "eye-outline" : "eye-off-outline"}
						size={24}
						color="white"
					/>
				</TouchableHighlight>
			)}
		</View>
	);
};

export default FormField;
