import React from "react";
import {View,Text,Image,TextInput,Pressable,SafeAreaView,KeyboardAvoidingView,Platform,
} from "react-native";

export default function Login() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}>

        <View className="flex-1 justify-between px-6 mt-10">

          <View className="items-center pt-6">

            <Image
              source={require("../../Assets/Images/olilitLogo.png")}
              className="w-[60%] max-w-[215px] h-[51px] mb-10"
              resizeMode="contain"/>

            <View className="w-full max-w-[342px] gap-5">

              <View className="items-center">
                <Text className="font-jakarta-semibold text-[20px] mb-6 text-center">
                  Login to Olilit Funding
                </Text>
              </View>

              <View>
                <Text className="font-jakarta-medium mb-2">
                  Email
                </Text>

                <TextInput
                  placeholder="Enter email"
                  className="bg-gray-200 border border-gray-300 h-[60px] rounded-2xl px-4 w-full"/>
              </View>

              <View>
                <Text className="font-jakarta-medium mb-2">
                  Password
                </Text>

                <TextInput
                  placeholder="Enter password"
                  secureTextEntry
                  className="bg-gray-200 border border-gray-300 h-[60px] rounded-2xl px-4 w-full"/>
              </View>

              <View className="items-end">
                <Text className="font-jakarta-medium">
                  Forgot Password?
                </Text>
              </View>

              <Pressable className="w-full h-[52px] bg-[#8BC240] rounded-2xl justify-center items-center">
                <Text className="text-white text-[16px] font-jakarta-semi-bold">
                  Login
                </Text>
              </Pressable>

            </View>
          </View>

          <View className="items-center pb-8">
            <Text className="text-[#232B39] text-[10px] mb-1">
              Powered by:
            </Text>

            <Image
              source={require("../../Assets/Images/legalsynq.png")}
              className="w-[40%] max-w-[120px] h-[30px] mb-3"
              resizeMode="contain"/>

            <Text className="text-[#232B39] text-[10px] text-center">
              Terms & Conditions | Privacy Policy
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}