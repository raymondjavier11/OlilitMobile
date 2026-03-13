import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import images from "../../constant/images";
import { useNavigation } from "@react-navigation/native";
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

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PayoutsDetails"
>;

type Props = {
  name: string;
  id: string;
  type: string;
  status: string;
  value: string;
  date: string;
};

export default function PayoutCard({
  name,
  id,
  type,
  status,
  value,
  date,
}: Props) {
  const navigation = useNavigation<NavigationProp>();

  const getStatusColor = () => {
    if (status === "Rejected") return "#E14D4D";
    if (status === "Pending") return "#898989";
    if (status === "Issued") return "#8BC240";
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("PayoutsDetails", {name,id,type,status,value,date,})}>

      <View
        className="h-[167px] bg-white rounded-[16px] border border-[#F4F4F4] px-[20px] py-[16px] mt-2"
        style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
          shadowRadius: 10,elevation: 5,}}>
        <Text className="font-jakarta-semibold text-[12px]">{name}</Text>
        <Text className="font-jakarta text-[12px]">{id}</Text>
        <Text className="font-jakarta text-[12px]">{type}</Text>

        <View
          style={{ backgroundColor: getStatusColor() }}
          className="w-[86px] h-[26px] rounded-[21px] items-center justify-center my-[8px]">
          <Text className="text-white text-[12px] font-semibold">
            {status}
          </Text>
        </View>

        <View className="pr-[30px] flex-row justify-between">
          <Text>Value</Text>
          <Text>{value}</Text>
        </View>

        <View className="pr-[30px] flex-row justify-between">
          <Text>Date / Time</Text>
          <Text>{date}</Text>
        </View>

        <Image
          source={images.rightArrow}
          className="w-[15px] h-[15px] absolute right-[20px] top-[60px]"/>
      </View>
    </Pressable>
  );
}