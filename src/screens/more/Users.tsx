import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../constant/images";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";

type User = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
};

type RootStackParamList = {
  Users: undefined;
   UserDetails: { user: User };
};

export default function Users() {

  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Users"
  >;

  const navigation = useNavigation<NavigationProp>();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {

    fetch("http://10.0.2.2:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[24px]">

        <View className="flex-row items-center mt-3 px-[24px]">

          <Pressable
            onPress={() => navigation.goBack()}
            className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">

            <Image
              source={images.leftArrow}
              className="w-[6px] h-[12px]"
            />

          </Pressable>

          <View className="flex-1 items-center">
            <Text className="text-[16px] font-jakarta-bold">
              Users
            </Text>
          </View>

          <View className="w-[44px]" />

        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-[30px]">

          {users.map((user) => (

            <Pressable
              key={user._id}

              onPress={() =>
                navigation.navigate("UserDetails", {
                  user,
                })
              }

              className="flex-row items-center border px-[20px] bg-[#FFFFFF]
              border-[#F4F4F4] rounded-[16px] py-[20px] mb-[20px]"

              style={{
                shadowColor: "#888",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 5,
              }}>

              <View className="rounded-[69px] bg-[#F6F6F6] px-[10px] py-[10px]">

                <Image
                  source={images.personIcon}
                  className="w-[26px] h-[25px]"
                  resizeMode="contain"
                />

              </View>

              <Text className="ml-[10px] flex-1 font-jakarta-medium text-[16px]">
                {user.fullName}
              </Text>

              <Image
                source={images.rightArrow}
                className="w-[6px] h-[12px]"
              />

            </Pressable>

          ))}

        </ScrollView>

      </View>
    </SafeAreaView>
  );
}