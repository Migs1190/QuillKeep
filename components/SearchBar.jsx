import { useContext } from "react";
import { ActivityIndicator, Platform, TextInput, View } from "react-native";
import { Colors, Styles } from "../constants";
import { GlobalContext } from "../context/GlobalProvider";
import debounce from "../lib/debounce";
import SearchPicker from "./SearchPicker";

const Searchbar = ({ handleWrite = (f) => f, option, setOption, loading }) => {
	const { mode } = useContext(GlobalContext);
	const writeBrakes = debounce((val) => handleWrite(val));

	return (
		<View
			className="h-14 flex-row rounded-lg mx-4 mb-2 border-[1px]"
			style={[
				Platform.OS === "android" && Styles.ShadowStyles.androidShadow,
				{
					borderColor: Colors[mode].border,
					backgroundColor: Colors[mode].componentBackground,
				},
			]}
		>
			<View className="flex-1">
				<TextInput
					className="px-4 h-full font-robotolit text-base dark:text-primary"
					placeholder="Search for a book"
					placeholderTextColor={Colors[mode].text}
					onChangeText={(value) => writeBrakes(value)}
				/>
			</View>
			{loading && (
				<ActivityIndicator
					color={Colors.tint}
					className="mx-2"
				/>
			)}
			<SearchPicker
				option={option}
				setOption={setOption}
				mode={mode}
			/>
		</View>
	);
};

export default Searchbar;
