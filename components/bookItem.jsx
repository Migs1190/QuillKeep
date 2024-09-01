import { View, Text } from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import { Link } from "expo-router";

const BookItem = memo(({ item }) => {
  return (
    <View className="w-[130px] h-[240px] mb-6">
      <Link
        href={`book/${item.title}?isbn=${item.isbn}`}
        className="w-full h-full top-0 absolute z-10"
        onPress={() => {
          console.log("Pressed");
        }}
      />
      <View className="flex-1">
        <Image
          source={{ uri: item.cover_l }}
          contentFit="cover"
          className="w-full h-full rounded-md"
        />
      </View>
      <View className="h-10 pt-1">
        <Text
          className="text-center text-base font-robotocn leading-5"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
      </View>
    </View>
  );
});

export default BookItem;
