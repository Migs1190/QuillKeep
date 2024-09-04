import { Image } from "expo-image";
import { Link } from "expo-router";
import { memo } from "react";
import { Text, View } from "react-native";

const BookItem = memo(
	({
		item,
		cardWidth = 130,
		cardHeight = 240,
		props,
		numOfLines = 2,
		coverSize = "L",
	}) => {
		return (
			<View
				className={props}
				style={{
					width: cardWidth,
					height: cardHeight,
				}}
			>
				<Link
					href={`book/${item.title}?isbn=${item.isbn}`}
					className="w-full h-full top-0 absolute z-10"
				/>
				<View className="flex-1">
					<Image
						source={{ uri: coverSize === "L" ? item.cover_l : item.cover_m }}
						contentFit="cover"
						className="w-full h-full rounded-md"
					/>
				</View>
				<View className="h-10 pt-1">
					<Text
						className="text-center text-base font-robotocn leading-5"
						numberOfLines={numOfLines}
						ellipsizeMode="tail"
					>
						{item.title}
					</Text>
				</View>
			</View>
		);
	},
);

export default BookItem;
