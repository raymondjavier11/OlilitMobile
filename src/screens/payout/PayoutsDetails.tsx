import { View, Text, Image, Pressable, TextInput } from "react-native";
import React from "react";
import images from "../../constant/images";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  PayoutsDetails: {
    name: string;
    id: string;
    type: string;
    status: string;
    value: string;
    date: string;
  };
};

type RouteProps = RouteProp<RootStackParamList, "PayoutsDetails">;

type NavigationProp = NativeStackNavigationProp<RootStackParamList,"PayoutsDetails">;

export default function PayoutsDetails() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();

  const { name, id, type, status, value, date } = route.params;

  const getStatusColor = () => {
    if (status === "Rejected") return "#E14D4D";
    if (status === "Pending") return "#898989";
    if (status === "Issued") return "#8BC240";
  };

  return (
    <View className="flex-1 px-[25px]">
      
      <View className="flex-row items-center mt-[44px]">

        <Pressable
          onPress={() => navigation.goBack()}
          className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
          <Image
            source={images.leftArrow}
            className="w-[12px] h-[20px]"/>
        </Pressable>

        <View className="flex-1 items-center">
          <Text className="text-[20px] font-jakarta-bold">
            Payouts Details
          </Text>
        </View>

        <View className="w-[44px]" />

      </View>

      <View
        className="bg-white rounded-[16px] border border-[#F4F4F4] px-[20px] py-[16px] mt-[16px]"
        style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
          shadowRadius: 10, elevation: 8,}}> 
          
        <View className="flex-row justify-between items-center pb-[16px]">
                <Text className="text-[16px] font-jakarta-bold">Payout Recipient(s)</Text>
            <View
                style={{ backgroundColor: getStatusColor() }}
                className="w-[86px] h-[26px] rounded-[21px] items-center justify-center ">
                <Text className="text-white text-[12px] font-semibold">
                    {status}
                </Text>
            </View>
        </View>

        <View className="flex-row justify-between ">
         <Text className="font-jakarta-semibold text-[14px]">{name}</Text>
          <Text className="text-[14px] font-jakarta-semibold">{value}</Text>
        </View>

        <View className="flex-row justify-between pb-[12px]">
          <Text className="font-jakarta text-[12px]">sample@email.com</Text>
          <Text className="font-jakarta text-[12px]">Claim Created</Text>
        </View>

        <Text className="font-jakarta-medium text-[14px] pb-[5px]">Phone Number</Text>
            <View className=" h-[60px] bg-[#eeecec] rounded-[16px] flex-row items-center px-4 gap-2">
                <TextInput placeholder="(252)123 - 1231"
                    className="flex-1 text-[16px] font-jakarta-bold text-[#121112]"/>
                <Image className="w-5 h-5"/>
            </View>
      </View>
    </View>
  );
}