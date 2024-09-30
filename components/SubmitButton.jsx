import { Colors } from "@/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableHighlight } from "react-native";
import { ActivityIndicator } from "react-native";

const SubmitButton = ({ isDisabled = false, pressAction = (f) => f }) => {
	return (
		<TouchableHighlight
			className="ml-auto w-20 h-20 justify-center items-center bg-secondary rounded-full"
			onPress={pressAction}
			underlayColor={Colors.tintDarker}
			disabled={isDisabled}
			style={{ elevation: 5 }}
		>
			{isDisabled ? (
				<ActivityIndicator
					animating
					size="large"
					color="white"
				/>
			) : (
				<FontAwesome
					name="arrow-right"
					size={24}
					color="white"
				/>
			)}
		</TouchableHighlight>
	);
};

export default SubmitButton;
