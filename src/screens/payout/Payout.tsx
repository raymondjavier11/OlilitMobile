import { View, Text, Image, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import PayoutCard from './PayoutCard'
import images from '../../constant/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { Animated } from "react-native";

export default function Payouts() {

  const [searchText, setSearchText] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  const [openCalendar, setOpenCalendar] = useState(false);

  const [range, setRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({});

  const [tempRange, setTempRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({});

  const showBanner = () => {
  Animated.timing(slideAnim, {
    toValue: 0, // baba
    duration: 300,
    useNativeDriver: true,
  }).start();

  setTimeout(() => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, 2000);
};

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

    const matchSearch =
      item.name.toLowerCase().includes(search) ||
      item.id.toLowerCase().includes(search);

    const matchStatus = selectedStatus
      ? item.status === selectedStatus
      : true;

    let matchDate = true;

    if (range.startDate && range.endDate) {
      const itemDate = new Date(item.date);

      matchDate =
        itemDate >= range.startDate &&
        itemDate <= range.endDate;
    }

    return matchSearch && matchStatus && matchDate;
  });

  const getMarkedDates = () => {
    if (!tempRange.startDate) return {};

    const start = tempRange.startDate;
    const end = tempRange.endDate || tempRange.startDate;

    let marked: any = {};
    let current = new Date(start);

    while (current <= end) {
      const dateString = current.toISOString().split("T")[0];

      marked[dateString] = {
        color: "#8BC240",
        textColor: "white",
      };

      current.setDate(current.getDate() + 1);
    }

    return marked;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-[25px] gap-3 mt-3">

        <View className="flex-row justify-between items-center h-[44px]">
          <Text className="text-[20px] font-jakarta-bold">
            Payouts
          </Text>

          <Pressable
            onPress={() => setShowFilterModal(true)}
            className="w-[44px] h-[44px] rounded-[54px] bg-[#eeeded] items-center justify-center">
            <Image 
              source={images.filterIcon}
              className="w-[20px] h-[20px]"/>
          </Pressable>
        </View>

        <View className="h-[60px] bg-[#eeecec] rounded-[16px] flex-row items-center px-4 gap-2">
          <TextInput
            placeholder="Search Payouts"
            className="flex-1 text-base"
            value={searchText}
            onChangeText={setSearchText}/>
          <Image 
            source={images.searchIcon} 
            className="w-5 h-5" />
        </View>

        <FlatList
          data={filteredPayouts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => ( <PayoutCard {...item} /> )}
          contentContainerStyle={{
            gap: 10,
            paddingTop: 5,
            paddingBottom: 80
          }}
          showsVerticalScrollIndicator={false}/>
      </View>

      <Modal visible={showFilterModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/30">
          
          <View className="bg-white rounded-t-[25px] p-5">

            <View className='flex-row justify-between'>
              <Text className="text-[18px] font-jakarta-bold mb-4">
                Sort & Filter
              </Text>

              <Pressable
                onPress={() => { setSelectedStatus(""); setSelectedDate("");
                  setRange({}); setTempRange({});
                }}>
                <Text className="text-[#8BC240] underline">Reset Filter</Text>
              </Pressable>
            </View>

            <View className="flex-row justify-between mb-5">
              {["Rejected", "Pending", "Issued"].map((status) => (
                <Pressable
                  key={status}
                  onPress={() =>
                    setSelectedStatus(selectedStatus === status ? "" : status)
                  }
                  className={`flex-1 mx-1 py-3 rounded-[12px] items-center ${
                    selectedStatus === status
                      ? "bg-[#8BC240]"
                      : "bg-gray-200"
                  }`}>
                  <Text className={selectedStatus === status ? "text-white" : "text-black"}>
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={() => {
                setTempRange(range); 
                setOpenCalendar(true);
              }}
              className="bg-gray-200 h-[55px] rounded-[12px] px-4 mb-5 flex-row justify-between items-center">

              <Text className="text-gray-500">
                {selectedDate || "Select Date"}
              </Text>

              <Image
                source={images.calendar2Icon}
                className="w-[18px] h-[18px]" />
            </Pressable>

            <Pressable
              onPress={() => {
                setRange(tempRange); 
                setShowFilterModal(false);
                showBanner();
              }}
              className="bg-[#8BC240] py-4 rounded-[15px] items-center mb-3">
              <Text className="text-white font-jakarta-bold">Apply</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setTempRange(range); 
                setShowFilterModal(false);
              }}
              className="bg-gray-300 py-4 rounded-[15px] items-center">
              <Text>Cancel</Text>
            </Pressable>

          </View>
        </View>
      </Modal>

      <Modal visible={openCalendar} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/40">

          <View className="bg-white rounded-[20px] p-5 w-[90%]">

            <Calendar
              markingType={"period"}
              onDayPress={(day) => {
                const selected = new Date(day.dateString);

                if (!tempRange.startDate || tempRange.endDate) {
                  setTempRange({
                    startDate: selected,
                    endDate: undefined,
                  });
                } else {
                  if (selected >= tempRange.startDate) {
                    setTempRange({ startDate: tempRange.startDate,
                      endDate: selected,
                    });
                  } else { setTempRange({ startDate: selected,
                      endDate: tempRange.startDate,
                    });
                  }
                }
              }}
              markedDates={getMarkedDates()}
              theme={{
                todayTextColor: "#8BC240",
                arrowColor: "#8BC240",
              }}
              enableSwipeMonths/>

            <View className="flex-row justify-between mt-6">

              <Pressable
                onPress={() => { setOpenCalendar(false);
                  setTempRange(range); 
                }}
                className="flex-1 bg-gray-300 py-3 rounded-[12px] items-center mr-2">
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setOpenCalendar(false);

                  if (tempRange.startDate && tempRange.endDate) {
                    setSelectedDate(
                      `${tempRange.startDate.toISOString().split("T")[0]} - ${tempRange.endDate.toISOString().split("T")[0]}`
                    );}
                }}
                className="flex-1 bg-[#8BC240] py-3 rounded-[12px] items-center ml-2">
                <Text className="text-white">Done</Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>

      <Animated.View
        style={{ position: "absolute", top: 30, left: 20, right: 20,
          transform: [{ translateY: slideAnim }],
          backgroundColor: "#6AA56A",
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 16,
          zIndex: 999,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
      
            <Text style={{ color: "white", fontWeight: "600" }}>
               Filters applied
            </Text>
      
            <Pressable
              onPress={() =>
                Animated.timing(slideAnim, {
                  toValue: -100,
                  duration: 300,
                  useNativeDriver: true,
            }).start()
            }>
             <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
            </Pressable>
      
      </Animated.View>

    </SafeAreaView>
  )
}