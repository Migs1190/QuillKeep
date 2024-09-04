import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants";

const CompositeButton = ({ content, icon, color, pressAction, loading }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="bg-white h-12 flex-1 flex-row justify-start items-center px-2 mx-1 rounded-md"
			style={{
				elevation: 5,
				shadowColor: "rgba(0, 0, 0, 0.6)",
				opacity: loading ? 0.8 : 1,
			}}
			onPress={pressAction}
			disabled={loading}
		>
			<>
				<View className="w-8 h-full justify-center items-center">
					{loading ? (
						<ActivityIndicator color={colors.SECONDARY} />
					) : (
						<FontAwesome
							name={icon}
							size={25}
							color={color}
						/>
					)}
				</View>
				<View className="h-full justify-center ml-2">
					<Text
						className="text-left text-base font-robotomit "
						style={{ color: color }}
					>
						{content}
					</Text>
				</View>
			</>
		</TouchableOpacity>
	);
};

export default CompositeButton;
