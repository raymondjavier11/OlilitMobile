import { View, Text,Pressable,Image } from 'react-native'
import React from 'react'
import images from "../../constant/images";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Users: undefined;
  UserDetails: { name: string };
};

export default function Users() {

    type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Users">;

    const navigation = useNavigation<NavigationProp>();

    const users = [
        { id: 1, name: "Maria Gonzales" },
        { id: 2, name: "JP Villegas" },
        { id: 3, name: "Annette Black" },
        { id: 4, name: "Jacob Jones" },
        { id: 5, name: "Kristin Watson" },
        { id: 6, name: "Jane Cooper" },
        { id: 7, name: "Darrell Steward" },
        { id: 8, name: "Darrell Steward" },
        { id: 9, name: "Darrell Steward" },
        { id: 10, name: "Darrell Steward" },
    ];

  return (

    <View className='px-[24px]'>
      <View className="flex-row items-center mt-12 px-[24px]">

        <Pressable onPress={() => navigation.goBack()}
            className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
          <Image
            source={images.leftArrow}
            className="w-[6px] h-[12px]"/>
        </Pressable>

        <View className="flex-1 items-center">
          <Text className="text-[16px] font-jakarta-bold">
            Users
          </Text>
        </View>

        <View className="w-[44px]" />

      </View>

      <ScrollView showsVerticalScrollIndicator={false}
      className="mt-[30px]">

        {users.map((user) => (
        <Pressable
            key={user.id}
            
            onPress={() => navigation.navigate("UserDetails", { name: user.name })}
            className="flex-row items-center px-[20px] bg-[#FFFFFF] 
            border-[#F4F4F4] rounded-[16px] py-[20px] mb-[20px]"
            style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
             shadowRadius: 10,elevation: 5,}}>

            <View className="rounded-[69px] bg-[#F6F6F6] px-[10px] py-[10px]">
                <Image
                source={images.personIcon}
                className="w-[26px] h-[25px]"
                resizeMode="contain"/>
            </View>

                <Text className="ml-[10px] flex-1 font-jakarta-medium text-[16px]">
                    {user.name}
                </Text>

                <Image
                    source={images.rightArrow}
                    className="w-[6px] h-[12px]"/>

        </Pressable>))}
        </ScrollView>

    </View>
  )
}