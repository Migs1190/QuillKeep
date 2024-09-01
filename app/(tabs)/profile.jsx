import { Image, Platform, SafeAreaView, Text, View } from "react-native";
import React, { useContext } from "react";
import { images } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import CirclesBG from "../../components/Bg";
import InfoBar from "../../components/infoBar";

const Profile = () => {
  const { userData } = useContext(GlobalContext);

  return (
    <SafeAreaView
      className={`bg-white flex-1 justify-start items-center space-y-10 px-4 ${
        Platform.OS === "android" && "pt-10"
      }`}
    >
      <CirclesBG />
      <View className="justify-center items-center pt-10">
        <Image
          source={{ uri: userData.avatar }}
          resizeMode="cover"
          className="w-40 h-40 rounded-full"
        />
      </View>
      <View className="w-full">
        <Text className="text-2xl font-robotor">{userData.username}</Text>
        <Text className="text-sm font-robotol">
          Member since:{" "}
          {userData.date_registered.split("").slice(0, 10).join("")}
        </Text>
      </View>
      <InfoBar title="My Books" />
    </SafeAreaView>
  );
};

export default Profile;
