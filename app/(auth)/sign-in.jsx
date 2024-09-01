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
import { signIn } from "../../lib/appwrite";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const SignIn = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (credentials.email === "" || credentials.password === "")
      return Alert.alert("Signing In", "Please fill in all fields");

    setIsSubmitting(true);
    try {
      await signIn({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password.trim(),
      });
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error in Sign in", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="w-full h-full justify-evenly px-5 bg-white">
      <View className="items-center">
        <Image
          source={{uri: images.logo}}
          resizeMode="contain"
          className="w-32 h-32"
        />
        <Text className="text-2xl font-robotol">
          Login to{" "}
          <Text className="font-robotomit text-secondary">VividRead</Text>
        </Text>
      </View>
      <View>
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
        <Link
          href="/recover"
          className="ml-auto mt-4 text-xs font-robotom underline"
          disabled={isSubmitting}
        >
          Forgot your login details?
        </Link>
      </View>
      <Text className="text-center font-robotol">
        Don't have an account?
        <Link
          href="/sign-up"
          className="text-base font-robotomit text-secondary"
          disabled={isSubmitting}
        >
          {" "}
          Sign up
        </Link>
      </Text>
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
            <FontAwesome name="arrow-right" size={24} color="white" />
          )}
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SignIn;
