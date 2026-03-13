import { View, Text, Image, TextInput, FlatList, Pressable } from 'react-native'
import React from 'react'
import PayoutCard from './PayoutCard'
import images from '../../constant/images'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Payouts() {
const [showApproveModal, setShowApproveModal] = useState(false);
 
const [searchText, setSearchText] = useState("");

  const payouts = [
    {
      name: "Choi, Kenneth",
      id: "51987",
      type: "pre-settlement funding",
      status: "Rejected",
      value: "$40,000.00",
      date: "2025-05-19 03:31:11 PM",
    },
    {
      name: "Choi, Kenneth",
      id: "51987",
      type: "pre-settlement funding",
      status: "Pending",
      value: "$40,000.00",
      date: "2025-05-19 03:31:11 PM",
    },
    {
      name: "Javier",
      id: "51387",
      type: "pre-settlement funding",
      status: "Issued",
      value: "$40,000.00",
      date: "2025-05-19 03:31:11 PM",
    },
    {
      name: "Raymond",
      id: "21987",
      type: "pre-settlement funding",
      status: "Pending",
      value: "$40,000.00",
      date: "2025-05-19 03:31:11 PM",
    },
    {
      name: "Israel",
      id: "31987",
      type: "pre-settlement funding",
      status: "Rejected",
      value: "$40,000.00",
      date: "2025-05-19 03:31:11 PM",
    },
    {
      name: "James",
      id: "51981",
      type: "pre-settlement funding",
      status: "Issued",
      value: "$40,000.00",
      date: "2025-05-19 03:31:11 PM",
    },  
  ]

  const filteredPayouts = payouts.filter((item) => {
    const search = searchText.toLowerCase();

    return (
      item.name.toLowerCase().includes(search) ||
      item.id.toLowerCase().includes(search)
    );
  });

 return (
  <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 px-[25px] gap-3 mt-3">

      <View className="flex-row justify-between items-center h-[44px]">
        <Text className="text-[20px] font-jakarta-bold">
          Payouts
        </Text>

        <View className="w-[44px] h-[44px] rounded-[54px] bg-[#eeeded] items-center justify-center">
          <Image 
            source={images.filterIcon}
            className="w-[20px] h-[20px]"/>
        </View>
      </View>

      <View className="h-[60px] bg-[#eeecec] rounded-[16px] flex-row items-center px-4 gap-2">
        <TextInput
            placeholder="Search Payouts"
            className="flex-1 text-base"
            value={searchText}
            onChangeText={setSearchText}
          />
        <Image 
          source={images.searchIcon} 
          className="w-5 h-5" />
      </View>

      <FlatList
        data={filteredPayouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PayoutCard
            name={item.name}
            id={item.id}
            type={item.type}
            status={item.status}
            value={item.value}
            date={item.date}
          />
        )}
        contentContainerStyle={{
          gap: 10,
          paddingTop: 5,
          paddingBottom: 80
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  </SafeAreaView>
)
}