import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import PickerOptions from "./PickerOptions";
import { Colors } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";

const CompositePickerButton = ({ content, color, setStatus }) => {
	const { mode } = useContext(GlobalContext);
	const [showOptions, setShowOptions] = useState(false);
	return (
		<Pressable
			className="h-12 flex-1 flex-row justify-start items-center px-2 mx-1 rounded-md z-20"
			style={{
				backgroundColor: Colors[mode].componentBackground,
				shadowColor: "rgba(0, 0, 0, 0.6)",
				elevation: 5,
			}}
			onPress={() => setShowOptions(!showOptions)}
		>
			<>
				<View
					className="w-full h-full flex-row"
					style={{ backgroundColor: Colors[mode].componentBackground }}
				>
					<View className="w-full justify-center ml-2">
						<Text
							className="text-left text-base font-robotomit "
							style={{ color }}
						>
							{content}
						</Text>
					</View>
					<View className="ml-auto justify-center">
						<MaterialIcons
							name="keyboard-arrow-down"
							size={25}
							color={color}
						/>
					</View>
				</View>
				<View className="w-full h-full top-1 left-2 absolute -z-10">
					<PickerOptions
						titles={["Want to Read", "Reading", "Completed", "Dropped"]}
						animTrigger={showOptions}
						setAnimTrigger={setShowOptions}
						setOption={setStatus}
					/>
				</View>
			</>
		</Pressable>
	);
};

export default CompositePickerButton;
