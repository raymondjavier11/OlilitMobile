import React, { useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constant/images";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ChangePassword() {
  const navigation = useNavigation<any>();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; submit?: string }>({});

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5] px-5 justify-between">
      <View>

        <View className="flex-row items-center mt-3 mb-8">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
            <Image
              source={images.leftArrow}
              className="w-[6px] h-[12px]"
              resizeMode="contain"
            />
          </Pressable>

          <Text className="flex-1 text-center text-[16px] font-jakarta-bold">
            Change Password
          </Text>

          <View className="w-[44px]" />
        </View>

        <Text className="font-jakarta-medium text-[16px] mb-5">
          For security, enter your current password
        </Text>

        <View>
          <Text className="font-jakarta-medium text-[14px] mb-2">Current Password</Text>

          <View className="bg-gray-200 border border-[#F3F3F3] h-[60px] rounded-2xl px-4 w-full flex-row items-center">
            <TextInput
              placeholder="Enter Current password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {setPassword(text); setErrors((prev) => ({ ...prev,
                  password: undefined, submit: undefined, }));
              }}
              className="flex-1" />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"} size={20}color="gray" />
            </Pressable>
          </View>

          {errors.password && (
            <Text className="text-red-600 text-[12px] mt-1">
              {errors.password}
            </Text>
          )}
        </View>
      </View>

        <Pressable onPress={() => navigation.navigate("ApplyNewPassword")}
            className="bg-[#8BC240] py-4 rounded-[15px] items-center mb-5">
            
            <Text className="text-white text-[16px] font-jakarta-bold">
            Continue
            </Text>

       </Pressable>

    </SafeAreaView>
  );
}