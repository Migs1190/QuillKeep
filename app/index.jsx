import { Image, Text, View } from "react-native";
import React, { useContext } from "react";
import { images, colors } from "@/constants";
import { Link, Redirect } from "expo-router";
import ShadowBtn from "../components/ShadowBtn";
import NormalBtn from "../components/NormalBtn";
import { GlobalContext } from "@/context/GlobalProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const App = () => {
  console.log(images);
  
  const { isLogged } = useContext(GlobalContext);

  if (isLogged) return <Redirect href="/home" />;

  return (
    <View className="w-full h-full justify-evenly items-center bg-white">
      <View className="w-full items-center justify-center">
        <Image
          source={{uri: images.logo}}
          resizeMode="contain"
          className="w-64 h-64"
        />
      </View>

      <View>
        <Text className="font-robotol text-3xl">
          Welcome to{" "}
          <Text className="font-robotomit text-secondary">VividRead</Text>
        </Text>
        <Text className="font-robotor text-sm text-center text-p_gray-100">
          Discover a world of stories at your fingertips.
        </Text>
      </View>

      <View className="w-20 flex-row justify-between">
        <FontAwesome5 name="glasses" size={24} color="black" />
        <FontAwesome5
          name="book-open"
          size={24}
          color={colors.SHADES.lightGray}
        />
        <FontAwesome5
          name="palette"
          size={24}
          color={colors.SHADES.lightGray}
        />
        <FontAwesome5
          name="lightbulb"
          size={24}
          color={colors.SHADES.lightGray}
        />
      </View>

      <View className="w-full">
        <View className="w-full justify-center flex-row px-4">
          <ShadowBtn dest="/sign-in" content="Sign In" />
          {/* Separator */}
          <View className="w-2" />
          <NormalBtn dest="/sign-up" content="Create an account" />
        </View>
        <Link
          // TODO make /home something else
          href="/home"
          className="font-robotor text-sm text-center text-p_gray-100 mt-8"
        >
          Explore as a visitor
        </Link>
      </View>
    </View>
  );
};

export default App;
