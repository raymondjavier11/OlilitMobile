import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import images from "../../constant/images";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ApproveComplete: {
    id: string;
    name: string;
    date: string;
    transactionId: string;
  };
  Main: {
    screen: "DashBoard";
  };
};

type RouteProps = RouteProp<RootStackParamList, "ApproveComplete">;

type NavigationProps = NativeStackNavigationProp<RootStackParamList,"ApproveComplete">;

export default function ApproveComplete() {
  const route = useRoute<RouteProps>();
  const { id, name, date, transactionId } = route.params;

  const navigation = useNavigation<NavigationProps>();

  return (
    <View className="flex-1 px-[25px]">
      
      <View className="flex-row items-center mt-12">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
          <Image
            source={images.leftArrow}
            className="w-[6px] h-[12px]"/>
        </Pressable>

        <Text className="flex-1 text-center text-[16px] font-jakarta-bold">
          Approve Complete
        </Text>

        <View className="w-[44px]"/>
      </View>

      <View className="bg-[#FFFFFF] rounded-[20px] border border-[#F4F4F4] p-[24px] mt-[20px]">

        <View className="items-center mt-[20px]">
          <Image source={images.checkIcon} className="w-[118px] h-[118px]" />
        </View>

        <View className="items-center px-[20px] mt-[16px]">
          <Text className="text-[20px] font-jakarta-bold text-center">
            Approve Complete
          </Text>

          <Text className="font-jakarta text-[12px] text-[#666] text-center mt-[8px]">
            Payout {id} - {name} has been successfully approved. 
            A confirmation email will be sent to their address.
          </Text>
        </View>

        <View className="border-t-[3px] border-[#F0F0F0] mt-[24px]" />

        <View className="flex-row items-center gap-[15px] py-[14px]">
          <Text className="font-jakarta-medium text-[12px] text-[#333]">
            Date Approved
          </Text>

          <Text className="font-jakarta text-[12px] text-[#666]">
            {date}
          </Text>
        </View>

        <View className="self-end w-[210px] border-t-[2px] border-[#F0F0F0]" />

        <View className="flex-row items-center py-[14px] gap-[15px]">
          <Text className="font-jakarta-medium text-[12.8px] text-[#333]">
            Transaction ID
          </Text>

          <Text className="font-jakarta text-[12px] text-[#666]">
            {transactionId}
          </Text>
        </View>

      </View>

      <Pressable
        onPress={() =>
          navigation.navigate("Main", {screen: "DashBoard",})}
        className="bg-[#8BC240] rounded-[16px] p-[16px] items-center mt-auto mb-[30px]">
        <Text className="font-jakarta-medium text-[#FFFFFF]">
          Back To Home
        </Text>
      </Pressable>

    </View>
  );
}