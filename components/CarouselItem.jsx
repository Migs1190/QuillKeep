import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { Link } from "expo-router";

const CarouselItem = ({ item }) => {
  return (
    <LinearGradient
      className="w-40 mx-2 rounded-md"
      colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.75)"]}
      start={{ x: 0.5, y: 0.65 }}
    >
      <Link
        href={`book/${item.title}?isbn=${item.isbn}`}
        className="w-full h-full absolute z-10"
      />
      <Image
        source={{ uri: item.cover_l }}
        contentFit="cover"
        className="w-full h-full -z-10 rounded-md"
      />
      <View className="w-full h-12 flex-row items-end justify-between absolute bottom-2 left-0 px-2">
        <View className="flex-1">
          <Text
            className="text-base text-white font-robotocnit"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
        </View>
        <View>
          <MaterialIcons name="arrow-forward-ios" size={16} color="white" />
        </View>
      </View>
    </LinearGradient>
  );
};

export default CarouselItem;
