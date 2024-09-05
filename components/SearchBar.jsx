import { ActivityIndicator, Platform, TextInput, View } from "react-native";
import { colors, styles } from "../constants";
import Picker from "./Picker";

const Searchbar = ({ handleWrite = (f) => f, option, setOption, loading }) => {
	const debounce = (func, delay = 1000) => {
		let timeOut;
		return (...args) => {
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				func(...args);
			}, delay);
		};
	};

	const writeBrakes = debounce((val) => handleWrite(val));

	return (
		<View
			className="h-14 bg-white flex-row rounded-lg mx-4 border-[1px] border-gray-200"
			style={Platform.OS === "android" && styles.ShadowStyles.androidShadow}
		>
			<View className="flex-1">
				<TextInput
					className="px-4 h-full font-robotolit text-base"
					placeholder="Search for a book"
					onChangeText={(value) => writeBrakes(value)}
				/>
			</View>
			{loading && (
				<ActivityIndicator
					color={colors.SECONDARY}
					className="mx-2"
				/>
			)}
			<Picker
				option={option}
				setOption={setOption}
			/>
		</View>
	);
};

export default Searchbar;
