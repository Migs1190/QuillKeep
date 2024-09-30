import { Colors } from "@/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CompositeButton = ({
	content,
	icon,
	color,
	pressAction,
	loading,
	dropdown = false,
	props = "",
}) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className={`bg-primary dark:bg-mine-shaft h-12 flex-row flex-1 justify-start items-center px-2 mx-1 rounded-md ${props}`}
			style={{
				elevation: 5,
				shadowColor: "rgba(0, 0, 0, 0.6)",
				opacity: loading ? 0.8 : 1,
			}}
			onPress={pressAction}
			disabled={loading}
		>
			<>
				{icon && (
					<View className="w-8 justify-center items-center">
						{loading ? (
							<ActivityIndicator color={Colors.tint} />
						) : (
							<FontAwesome
								name={icon}
								size={25}
								color={color}
							/>
						)}
					</View>
				)}
				<View className="justify-center ml-2">
					<Text
						className="text-left text-base font-robotomit "
						style={{ color: color }}
					>
						{content}
					</Text>
				</View>
				{dropdown && (
					<View className="ml-auto">
						<MaterialIcons
							name="keyboard-arrow-down"
							size={25}
							color={color}
						/>
					</View>
				)}
			</>
		</TouchableOpacity>
	);
};

export default CompositeButton;
