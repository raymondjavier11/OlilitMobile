import { View, Text, Image, Pressable, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import images from "../../constant/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  CaseDetails: {
    name: string;
    phone: string;
    address: string;
  };
};

export default function Company() {

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const companies = [
    {
      id: 1,
      name: "ABC Company",
      phone: "61239001123",
      address: "3578 Hiney Road, Nevada, Las Vegas",
      date: "December 20, 2025. 03:31:11 PM",
    },
    {
      id: 2,
      name: "Global Tech Ltd.",
      phone: "98765432100",
      address: "245 Sunset Blvd, California, Los Angeles",
      date: "January 12, 2026. 10:20:45 AM",
    },
    {
      id: 3,
      name: "Prime Holdings",
      phone: "44556677889",
      address: "120 King Street, New York, Manhattan",
      date: "February 05, 2026. 08:15:30 PM",
    },
    {
      id: 4,
      name: "Prime Holdings",
      phone: "44556677889",
      address: "120 King Street, New York, Manhattan",
      date: "February 05, 2026. 08:15:30 PM",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white ">
    <View className="flex-1 px-[24px]">

      <View className="flex-row items-center mt-12 mb-[20px]">

        <Pressable
          onPress={() => navigation.goBack()}
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

      <ScrollView showsVerticalScrollIndicator={false}>

        {companies.map((company) => (
          <View
            key={company.id}
            className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-5"
            style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
          shadowRadius: 10, elevation: 4,}}>

            <View className="flex-row justify-between items-center">
              <Text className="font-jakarta-medium text-[14px]">
                {company.name}
              </Text>

              <View className="flex-row items-center gap-2 rounded-[12px] bg-[#8BC2401A] p-[8px]">
                <Image
                  className="w-[10px] h-[10px]"
                  source={images.company}/>
                <Text className="font-jakarta-medium text-[10px]">
                  Company Type
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 mt-3">
              <Image
                className="w-[12px] h-[12px]"
                source={images.phoneIcon}/>
              <Text className="font-jakarta-medium text-[12px]">
                {company.phone}
              </Text>
            </View>

            <View className="flex-row items-center gap-3 mt-3">
              <Image
                className="w-[12px] h-[12px]"
                source={images.locationIcon}/>
              <Text className="font-jakarta-medium text-[12px]">
                {company.address}
              </Text>
            </View>

            <View className="flex-row items-center gap-3 mt-3">
              <Image
                className="w-[12px] h-[12px]"
                source={images.calendarIcon}/>
              <Text className="font-jakarta-medium text-[12px]">
                {company.date}
              </Text>
            </View>

            <Pressable onPress={() => navigation.navigate("CaseDetails", {
                  name: company.name, phone: company.phone, address: company.address, })}
              className="rounded-[16px] bg-[#FFFFFF] border border-[#8BC240] px-[20px] py-[16px] items-center mt-6">
              <Text className="text-[#8BC240] font-jakarta-medium">
                View Details
              </Text>
            </Pressable>

          </View>
        ))}

      </ScrollView>

    </View>
    </SafeAreaView>
  );
}