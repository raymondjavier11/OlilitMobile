import { View, Text, Image, Switch, Pressable } from "react-native";
import React, { useState } from "react";
import images from "../../constant/images";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type User = {
  _id: string;
  fullName: string;
  email: string;
  permissions: {
    releasePayout: boolean;
    settlementOption: boolean;
    deleteDeal: boolean;
  };
};

type RootStackParamList = {
  UserDetails: { user: User };
};

export default function UserDetails() {

  const route = useRoute<RouteProp<RootStackParamList, "UserDetails">>();
  const navigation = useNavigation();

  const user = route.params?.user;

  const [showToast, setShowToast] = useState(false);

  const showPermissionToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[24px]">

        {/* TOAST */}
        {showToast && (
          <View
            className="absolute top-[45px] left-[20px] right-[20px] 
            bg-[#5FA067] p-[30px] rounded-[12px] flex-row justify-between items-center"
            style={{ zIndex: 100 }}
          >
            <Text className="text-white font-jakarta-medium">
              Permission Updated
            </Text>

            <Text className="text-white text-[16px]">✕</Text>
          </View>
        )}

        {/* HEADER */}
        <View className="flex-row items-center mt-3 mb-[20px]">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center"
          >
            <Image
              source={images.leftArrow}
              className="w-[6px] h-[12px]"
            />
          </Pressable>

          <View className="flex-1 items-center">
            <Text className="text-[16px] font-jakarta-bold">
              User Details
            </Text>
          </View>

          <View className="w-[44px]" />
        </View>

        <View
          className="bg-white rounded-[16px] p-[20px]"
          style={{
            shadowColor: "#888",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 5,
          }}
        >

          <View className="flex-row items-center mb-[20px]">
            <View className="bg-[#F6F6F6] rounded-full p-[10px]">
              <Image
                source={images.personIcon}
                className="w-[26px] h-[25px]"
                resizeMode="contain"
              />
            </View>

            <Text className="ml-[12px] text-[16px] font-jakarta-medium">
              {user?.fullName}
            </Text>
          </View>

          <View className="flex-row justify-between mb-[12px]">
            <Text className="text-gray-400 text-[12px]">Email</Text>
            <Text className="text-[14px]">
              {user?.email}
            </Text>
          </View>

          <View className="h-[1px] bg-[#EAEAEA] mb-[12px]" />

          <View className="flex-row justify-between mb-[12px]">
            <Text className="text-gray-400 text-[12px]">Date Added</Text>
            <Text className="text-[14px]">2025-06-25</Text>
          </View>

          <View className="h-[1px] bg-[#EAEAEA] mb-[12px]" />

          <View className="flex-row justify-between mb-[16px]">
            <Text className="text-gray-400 text-[12px]">Last Date Active</Text>
            <Text className="text-[14px]">2025-06-25</Text>
          </View>

          <View className="h-[1px] bg-[#EAEAEA] mb-[30px] mt-[15px]" />

          <Text className="text-[16px] font-jakarta-medium mb-[10px]">
            Access
          </Text>

          <View className="flex-row justify-between items-center mb-[12px]">
            <Text className="text-[14px]">Release Payout</Text>
            <Switch
              value={user?.permissions?.releasePayout}
              onValueChange={() => showPermissionToast()}
            />
          </View>

          <View className="flex-row justify-between items-center mb-[12px]">
            <Text className="text-[14px]">Settlement Option</Text>
            <Switch
              value={user?.permissions?.settlementOption}
              onValueChange={() => showPermissionToast()}
            />
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-[14px]">Delete Deal</Text>
            <Switch
              value={user?.permissions?.deleteDeal}
              onValueChange={() => showPermissionToast()}
            />
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}