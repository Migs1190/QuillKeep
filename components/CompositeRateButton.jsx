import { Colors } from "@/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import DropDownItem from "./DropDownItem";

const CompositeRateButton = ({
	content,
	icon,
	color,
	loading,
	rating,
	setRating,
}) => {
	const [showStar, setShowStar] = useState(false);

	return (
		<Pressable
			className="bg-primary dark:bg-mine-shaft grow flex-row h-12 justify-center items-center px-2 mx-1 rounded-md z-20"
			onPress={() => setShowStar(!showStar)}
			disabled={loading}
			style={{
				elevation: 5,
				shadowColor: "rgba(0, 0, 0, 0.6)",
				opacity: loading ? 0.8 : 1,
			}}
		>
			<View className="bg-primary dark:bg-mine-shaft h-full flex-1 flex-row items-center">
				<View className="w-8 justify-center items-center">
					{loading ? (
						<ActivityIndicator color={Colors.tint} />
					) : (
						<View>
							<View style={{ opacity: 1 - rating * 0.1 }}>
								<FontAwesome
									name={icon}
									size={25}
									color={color}
								/>
							</View>
							<View
								className="absolute"
								style={{ width: `${(rating / 5) * 75}%` }}
							>
								<FontAwesome
									name={icon}
									size={25}
									color={Colors.tint}
								/>
							</View>
						</View>
					)}
				</View>
				<View className=" justify-center">
					<Text
						className="text-left text-base font-robotomit"
						style={{ color }}
					>
						{content}
					</Text>
				</View>
				<View className="ml-auto">
					<MaterialIcons
						name="keyboard-arrow-down"
						size={25}
						color={color}
					/>
				</View>
			</View>
			<View className="w-full h-full px-1 justify-around flex-row top-2 absolute -z-10">
				{new Array(5).fill(0).map((_, i) => (
					<DropDownItem
						key={i}
						itemId={i + 1}
						setRating={setRating}
						animTrigger={showStar}
						delay={i * 50}
						loading={loading}
						component={
							<FontAwesome
								name={"star"}
								size={30}
								color={i + 1 <= rating ? Colors.tint : color}
							/>
						}
					/>
				))}
			</View>
		</Pressable>
	);
};

export default CompositeRateButton;
