import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import images from "../../constant/images";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Home: undefined;
  Users: undefined;
  Company: undefined;
};

export default function More() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-white">
     <View className="px-[24px] mt-5">

      <Text className="font-jakarta-bold text-[20px]">More</Text>

      <View className="mt-[30px]">
        <Text className="font-jakarta-medium text-[16px]">Action</Text>

        <View className="flex-row mt-[20px] gap-2">

          <Pressable
            onPress={() => navigation.navigate("Users")}
            className="flex-1">
            <View
              className="py-[24px] items-center border border-[#F4F4F4] bg-white rounded-[8px]"
              style={{shadowColor: "#888",shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, elevation: 4, }} >
              <Image
                source={images.user}
                className="w-[22px] h-[14px]"
                resizeMode="contain"/>
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Company")}
            className="flex-1">
            <View
              className="py-[24px] items-center border border-[#F4F4F4] bg-white rounded-[8px]"
              style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, elevation: 4, }}>
              <Image
                source={images.company}
                className="w-[22px] h-[14px]"
                resizeMode="contain"/>
            </View>
          </Pressable>

          <Pressable className="flex-1">
            <View
              className="py-[24px] items-center border border-[#F4F4F4] bg-white rounded-[8px]"
              style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, elevation: 4, }} >
              <Image
                source={images.contacts}
                className="w-[22px] h-[14px]"
                resizeMode="contain"/>
            </View>
          </Pressable>

          <Pressable className="flex-1">
            <View
              className="py-[24px] items-center border border-[#F4F4F4] bg-white rounded-[8px]"
              style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, elevation: 4, }} >
              <Image
                source={images.bag}
                className="w-[22px] h-[14px]"
                resizeMode="contain"/>
            </View>
          </Pressable>

        </View>

      </View>
    </View>
    </SafeAreaView>
  );
}