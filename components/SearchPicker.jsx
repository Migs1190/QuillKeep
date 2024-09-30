import { Colors } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import PickerOptions from "./PickerOptions";

const SearchPicker = ({ option, setOption, mode }) => {
	const [showList, setShowList] = useState(false);

	const options = ["Title", "Author", "ISBN"];

	return (
		<Pressable
			onPress={() => setShowList(!showList)}
			className="w-20 h-13 flex-row justify-center items-center border-l-[1px] z-20"
			style={{ borderColor: Colors[mode].border }}
		>
			<View
				className="flex-1 h-full flex-row justify-center items-center rounded-r-lg z-20"
				style={{ backgroundColor: Colors[mode].componentBackgroundSecondary }}
			>
				<Text
					className="text-sm font-robotomit"
					style={{ color: Colors[mode].iconDefault }}
				>
					{option}
				</Text>
				<MaterialIcons
					name={showList ? "keyboard-arrow-up" : "keyboard-arrow-down"}
					size={22}
					color={Colors[mode].iconDefault}
				/>
			</View>
			<PickerOptions
				titles={options}
				animTrigger={showList}
				setAnimTrigger={setShowList}
				setOption={setOption}
				offset={8}
			/>
		</Pressable>
	);
};

export default SearchPicker;
