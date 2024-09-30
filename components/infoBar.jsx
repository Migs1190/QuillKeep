import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlashList } from "@shopify/flash-list";
import { useContext, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BookItem from "./bookItem";
import { GlobalContext } from "@/context/GlobalProvider";
import { Colors } from "@/constants";

const InfoBar = ({ title, data, props, icon }) => {
	const { mode } = useContext(GlobalContext);
	const [showBody, setShowBody] = useState(true);
	const bodyRef = useRef();

	return (
		<View className={`w-full ${props}`}>
			<View
				className={`flex-row justify-start items-center px-2 py-1 relative ${showBody ? "rounded-t-md" : "rounded-md"}`}
				style={{ backgroundColor: Colors.tint }}
			>
				<View className="w-10 justify-center items-center">
					<FontAwesome
						name={icon}
						size={25}
						color={Colors[mode].iconDefault}
					/>
				</View>
				<Text
					className="text-xl font-robotol"
					style={{ color: Colors[mode].text }}
				>
					{title} ({data.length})
				</Text>
				<TouchableOpacity
					className="w-full h-full absolute	top-1 left-2 items-end"
					onPress={() => setShowBody(!showBody)}
					activeOpacity={1}
				>
					<MaterialIcons
						name={showBody ? "keyboard-arrow-up" : "keyboard-arrow-down"}
						size={30}
						color={Colors[mode].text}
					/>
				</TouchableOpacity>
			</View>
			<View
				className="rounded-b-md border border-t-0"
				style={{
					backgroundColor: Colors[mode].componentBackground,
					borderColor: Colors.tint,
					display: showBody ? "block" : "none",
					padding: showBody ? 10 : 0,
				}}
				ref={bodyRef}
			>
				<FlashList
					data={data ?? []}
					estimatedItemSize={98}
					renderItem={({ item }) => (
						<BookItem
							item={item}
							cardWidth={80}
							cardHeight={160}
							props={"mx-2 mt-1"}
							numOfLines={1}
							coverSize="S"
						/>
					)}
					ListEmptyComponent={() => (
						<Text className="font-robotor dark:text-primary">
							No Books Added yet...
						</Text>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};

export default InfoBar;
