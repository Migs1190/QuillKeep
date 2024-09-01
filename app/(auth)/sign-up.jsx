import {
  View,
  Image,
  Text,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import { colors, images } from "@/constants";
import { Link, router } from "expo-router";
import { signUp } from "../../lib/appwrite";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const SignUp = () => {
  const [credentials, setcredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (
      credentials.username === "" ||
      credentials.email === "" ||
      credentials.password === ""
    )
      return Alert.alert("Signing up", "Please fill in all fields");

    setIsSubmitting(true);
    try {
      await signUp({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password.trim(),
        username: credentials.username.trim(),
      });
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error in Sign up", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="h-full flex-auto justify-evenly px-5 bg-white">
      <View className="items-center">
        <Image
          source={{uri: images.logo}}
          resizeMode="contain"
          className="w-32 h-32"
        />
        <Text className="text-2xl font-robotol">
          Sign up to{" "}
          <Text className="font-robotomit text-secondary">VividRead</Text>
        </Text>
      </View>
      <View>
        <FormField
          value={credentials.username}
          label="Username"
          palceholder="Username"
          handleWrite={setcredentials}
          isDisabled={isSubmitting}
        />
        <FormField
          value={credentials.email}
          label="Email"
          palceholder="Email"
          handleWrite={setcredentials}
          keyboardType="email-address"
          isDisabled={isSubmitting}
        />
        <FormField
          value={credentials.password}
          label="Password"
          palceholder="Password"
          handleWrite={setcredentials}
          isDisabled={isSubmitting}
        />
      </View>
      <View>
        <Text className="text-center font-robotol">
          Already have an account?
          <Link
            href="/sign-in"
            className="text-base font-robotomit text-secondary"
            disabled={isSubmitting}
          >
            {" "}
            Sign In
          </Link>
        </Text>
      </View>
      <View>
        <TouchableHighlight
          className="ml-auto w-20 h-20 justify-center items-center bg-secondary rounded-full"
          onPress={submitForm}
          underlayColor={colors.DARKER_SECONDARY}
          disabled={isSubmitting}
          style={{ elevation: 5 }}
        >
          {isSubmitting ? (
            <ActivityIndicator animating size="large" color="white" />
          ) : (
            <FontAwesome name="arrow-right" size={24} color="black" />
          )}
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SignUp;
