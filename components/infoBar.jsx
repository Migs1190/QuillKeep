import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import BookItem from "./bookItem";

const InfoBar = ({ title, data, props, icon }) => {
	const [showBody, setShowBody] = useState(true);
	const bodyRef = useRef();
	// console.log(data);

	return (
		<View className={`w-full ${props}`}>
			<View
				className={`flex-row justify-start items-center bg-secondary px-2 py-1 relative ${showBody ? "rounded-t-md" : "rounded-md"}`}
			>
				<View className="w-10 justify-center items-center">
					<FontAwesome
						name={icon}
						size={25}
						color={"white"}
					/>
				</View>
				<Text className="text-white text-xl font-robotol">
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
						color="white"
					/>
				</TouchableOpacity>
			</View>
			<View
				className="bg-white rounded-b-md border border-t-0 border-secondary"
				style={{
					display: showBody ? "block" : "none",
					padding: showBody ? 10 : 0,
				}}
				ref={bodyRef}
			>
				<FlatList
					data={data ?? []}
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
					keyExtractor={(item) => item.isbn}
					ListEmptyComponent={() => <Text>No Books Added yet...</Text>}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};

export default InfoBar;
