import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

const SettingsPanel = ({
	dest = "#",
	icon,
	content,
	first = false,
	last = false,
	breaker = false,
	border = true,
}) => {
	if (breaker) return <View className="w-full border-b-2 border-gray-400" />;
	return (
		<View>
			<Link
				href={dest}
				className={`bg-white p-4 ${border && "border-y-2 border-gray-400"} ${
					first && "rounded-t-2xl border-0"
				} ${last && "rounded-b-2xl border-0"}`}
				style={{ elevation: 10 }}
				asChild
			>
				<Pressable>
					<View className={"flex-row justify-start items-center"}>
						<FontAwesome5
							name={icon}
							size={24}
							color="black"
						/>
						<Text className="mx-4 text-base font-robotor">{content}</Text>
						<View className="ml-auto mr-4">
							<MaterialIcons
								name="arrow-forward-ios"
								size={24}
								color="black"
							/>
						</View>
					</View>
				</Pressable>
			</Link>
		</View>
	);
};

export default SettingsPanel;
