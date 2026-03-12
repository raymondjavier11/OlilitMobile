import { View, Text,Image, Pressable } from 'react-native'
import React from 'react'
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
    <SafeAreaView className="flex-1 bg-white ">
    <View className='px-[25px] mt-5'>

        <Text className='font-jakarta-bold text-[20px]'>More</Text>
    
      <View className='mt-[30px] ' >
        <Text className='font-jakarta-medium text-[16px]'>Action</Text>

        <View className="gap-[10px] mt-[20px] flex-row justify-between">

            <View className="p-[24px] border border-[#F4F4F4] bg-[#FFFFFF] rounded-[8px]"
                  style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4,}}>
          
                <Pressable  onPress={() => navigation.navigate("Users")}>
                <Image source={images.user} className="w-[27.13px] h-[15.75px]" resizeMode="contain" />
                </Pressable>
            </View>

            <View className="p-[24px] border border-[#F4F4F4] bg-[#FFFFFF] rounded-[8px]"
                  style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4,}}>
          
                <Pressable onPress={() => navigation.navigate("Company")}>
                <Image source={images.company} className="w-[28.13px] h-[16.75px]" resizeMode="contain" />
                </Pressable>
            </View>

            <View className="p-[24px] border border-[#F4F4F4] bg-[#FFFFFF] rounded-[8px]"
                  style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4,}}>
          
                <Pressable>
                <Image source={images.contacts} className="w-[28.13px] h-[16.75px]" resizeMode="contain" />
                </Pressable>
            </View>

            <View className="p-[24px] border border-[#F4F4F4] bg-[#FFFFFF] rounded-[8px]"
                  style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4,}}>
          
                <Pressable>
                <Image source={images.bag} className="w-[28.13px] h-[16.75px]" resizeMode="contain" />
                </Pressable>
            </View>

        </View>

      </View>

    </View>
    </SafeAreaView>
  )
}