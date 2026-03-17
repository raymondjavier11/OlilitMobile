import React, { useState } from "react";
import { View, Text, Switch, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constant/images";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export default function Settings() {

  const navigation = useNavigation<any>();
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5] px-5">
      
     <View className="flex-row items-center mt-3 mb-8">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
          <Image
            source={images.leftArrow}
            className="w-[6px] h-[12px]"
            resizeMode="contain"/>
        </Pressable>

        <Text className="flex-1 text-center text-[16px] font-jakarta-bold">
          Settings
        </Text>

        <View className="w-[44px]"/>
      </View>

      <View className= " bg-white rounded-[16px] border border-[#F4F4F4] px-[20px] py-[16px] mt-2"
        style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
          shadowRadius: 10,elevation: 5,}}>
        
        <Text className="font-jakarta-bold text-[18px] font-semibold mt-1">
          Notifications
        </Text>

        <View className="flex-row items-center justify-between py-2">
          <Text className="font-jakarta-medium text-[14px] text-[#333]">
            Push notification
          </Text>
          <Switch value={isEnabled} onValueChange={() => setIsEnabled(!isEnabled)}
            trackColor={{ false: "#ccc", true: "#9be15d" }}
            thumbColor="#fff" />
        </View>

        <View className="h-[1px] bg-[#EEEEEE] my-2" />

        <Text className="font-jakarta-semibold text-[18px] font-semibold ">
          Security
        </Text>

        <View className="flex-row items-center justify-between py-2 pr-3">

        <Pressable
          onPress={() => navigation.navigate("ChangePassword")}
          className="flex-1 flex-row items-center justify-between py-2">

          <Text className="font-jakarta-medium text-[14px] text-[#333]">
            Change Password
          </Text>

          <Image source={images.rightArrow}
            className="w-[6px] h-[12px]" resizeMode="contain"/>
          
        </Pressable>

      </View>

        <View className="h-[1px] bg-[#EEEEEE] my-2" />

        <Text className="font-jakarta-semibold text-[18px] font-semibold">
          Legal Policies
        </Text>

        <View className="flex-row items-center justify-between py-2 pr-3">

          <Pressable className="flex-row items-center justify-between py-2">
            <Text className="text-[14px] text-[#333]">
              Terms and Conditions
            </Text>
          </Pressable>

          <Image source={images.rightArrow}
                 className="w-[6px] h-[12px]" resizeMode="contain"/>

        </View>

         <View className="h-[1px] bg-[#EEEEEE] my-2" />

        <View className="flex-row items-center justify-between py-2 pr-3">

          <Pressable className="flex-row items-center justify-between py-2">
            <Text className="text-[14px] text-[#333]">
              Privacy Policy
            </Text>
          </Pressable>

          <Image source={images.rightArrow}
                className="w-[6px] h-[12px]"resizeMode="contain"/>

        </View>

        <Pressable className="mt-5 bg-[#9e9e9e] py-4 rounded-[15px] items-center">
          <Text className="text-white text-[15px] font-medium">
            Log out
          </Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}