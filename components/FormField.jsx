import { useState } from "react";
import { TextInput, TouchableHighlight, View } from "react-native";
import { colors, icons } from "../constants";

const FormField = ({
	value,
	label,
	palceholder,
	handleWrite = (f) => f,
	isDisabled,
}) => {
	const [showPass, setshowPass] = useState(false);
	return (
		<View className="h-14 bg-white flex-row rounded-lg my-2 border-[1px] border-gray-200 focus:border-secondary overflow-hidden">
			<View className="flex-1">
				<TextInput
					value={value}
					className={`px-4 h-full ${isDisabled && "opacity-50"}`}
					placeholder={palceholder}
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
					underlayColor={colors.DARKER_SECONDARY}
					onPress={() => setshowPass(!showPass)}
				>
					{/* <Image src={icons}/> */}
					<Image
						asset={showPass ? icons.eye : icons.eyeOff}
						width={24}
						height={24}
						fill="white"
					/>
				</TouchableHighlight>
			)}
		</View>
	);
};

export default FormField;
