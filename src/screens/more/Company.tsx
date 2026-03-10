import { View, Text, Image,Pressable,TextInput } from "react-native";
import { useState } from "react";
import images from "../../constant/images";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Company() {

  const navigation = useNavigation();

  return (
    <View className="px-[24px]">
      <View className="flex-row items-center mt-12 mb-[20px]">

        <Pressable onPress={() => navigation.goBack()}
            className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
          <Image
            source={images.leftArrow}
            className="w-[6px] h-[12px]"/>
        </Pressable>

        <View className="flex-1 items-center">
          <Text className="text-[16px] font-jakarta-bold">
            Company
          </Text>
        </View>

        <View className="w-[44px]" />

      </View>

        <View className="flex-row justify-between gap-3">
          <View className="flex-1 h-[60px] bg-[#eeecec] rounded-[16px] flex-row items-center px-4 gap-2">
            <TextInput
              placeholder="Search Payouts"
              className="flex-1 text-base"/>
          </View>
          <View className="w-[60px] h-[60px] rounded-[54px] bg-[#eeeded] items-center justify-center">
            <Image 
              source={images.filterIcon}
              className="w-[20px] h-[20px]"/>
          </View>
        </View>

    </View>
  )
}