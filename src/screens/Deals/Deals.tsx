import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Svg, { Path, Line, Polyline } from "react-native-svg";
import SortFilterModal from "./SortFilterModal";
import images from "../../constant/images";


type OverviewStat = {
  id: string;
  label: string;
  count: number;
  amount: string;
};

type CaseItem = {
  id: string;
  clientName: string;
  caseNumber: string;
  amount: string;
  tags: string[];
  status: string;
  dateOfLoss: string;
  dateReceived: string;
  stageTime: string;
};

type RootStackParamList = {
  DealsCaseDetails: {
    id: string;
    clientName: string;
    caseNumber: string;
    amount: string;
    status: string;
    tags: string[];
    dateOfLoss: string;
    dateReceived: string;
    stageTime: string;
  };
};



const FILTER_OPTIONS: string[] = ["All Deals", "Processing", "UnderWriting"];




const overviewStats: OverviewStat[] = [
  { id: "1", label: "Totals",         count: 135, amount: "$135,100.00" },
  { id: "2", label: "Ready To Funds", count: 135, amount: "$135,100.00" },
  { id: "3", label: "Pending",        count: 42,  amount: "$48,200.00"  },
];

const recentCases: CaseItem[] = [
  {
    id: "1",
    clientName: "Choi, Kenneth",
    caseNumber: "51987",
    amount: "$90,000.00",
    tags: ["New Client", "Law Firm Company"],
    status: "Rejected",
    dateOfLoss: "2025-05-19",
    dateReceived: "2025-05-19",
    stageTime: "2025-05-19  03:31:11 PM",
  },
  {
    id: "2",
    clientName: "Martinez, Sofia",
    caseNumber: "51988",
    amount: "$45,500.00",
    tags: ["Returning Client"],
    status: "Approved",
    dateOfLoss: "2025-05-18",
    dateReceived: "2025-05-18",
    stageTime: "2025-05-18  11:15:00 AM",
  },
  {
    id: "3",
    clientName: "Thompson, Derek",
    caseNumber: "51989",
    amount: "$22,750.00",
    tags: ["New Client", "Direct"],
    status: "Pending",
    dateOfLoss: "2025-05-17",
    dateReceived: "2025-05-17",
    stageTime: "2025-05-17  09:00:00 AM",
  },
  {
    id: "4",
    clientName: "Nguyen, Linh",
    caseNumber: "51990",
    amount: "$61,000.00",
    tags: ["Law Firm Company"],
    status: "Under Review",
    dateOfLoss: "2025-05-16",
    dateReceived: "2025-05-16",
    stageTime: "2025-05-16  02:45:30 PM",
  },
];



const getStatusColor = (status: string) => {
  if (status === "Rejected")     return "#E14D4D";
  if (status === "Approved")     return "#8BC240";
  if (status === "Pending")      return "#FF9500";
  if (status === "Under Review") return "#5856D6";
  return "#898989";
};



const Header = ({ onFilterPress }: { onFilterPress: () => void }) =>  (
  <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-[#E0E0E0]">
    <Image source={images.logo} style={{ height: 36, width: 140 }} resizeMode="contain" />
    <View className="flex-row items-center gap-x-1">
      <TouchableOpacity className="p-2">
        <Image source={images.Notif} style={{ width: 30, height: 30 }} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity className="p-2"  onPress={onFilterPress}>
        <Image source={images.filterIcon} style={{ width: 18, height: 18 }} resizeMode="contain" />
        
      </TouchableOpacity>
    </View>
  </View>
);

const OverviewCard = ({ item }: { item: OverviewStat }) => (
  <View
    className="bg-white rounded-xl p-3.5 w-40 mr-3"
    style={{ elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 }}>
    <View className="flex-row items-center gap-x-1.5 mb-2.5">
      {item.label === "Ready To Funds" ? (
        <Image source={images.Gcheck} style={{ width: 20, height: 20 }} resizeMode="contain" />
      ) : (
        <Image source={images.check} style={{ width: 20, height: 20 }} resizeMode="contain" />
      )}
      <Text className="text-xs font-semibold text-[#212121] flex-shrink">{item.label}</Text>
    </View>
    <View className="flex-row justify-between mb-1">
      <Text className="text-xs text-[#757575]">Count:</Text>
      <Text className="text-xs font-semibold text-[#212121]">{item.count}</Text>
    </View>
    <View className="flex-row justify-between">
      <Text className="text-xs text-[#757575]">Amount:</Text>
      <Text className="text-xs font-semibold text-[#212121]">{item.amount}</Text>
    </View>
  </View>
);

const CaseCard = ({ item }: { item: CaseItem }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      className="bg-white rounded-2xl p-4 mb-3.5"
      style={{ elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 5 }}>

      {/* Client + Amount */}
      <View className="flex-row justify-between items-start mb-2.5">
        <View>
          <Text className="text-base font-bold text-[#212121]">{item.clientName}</Text>
          <Text className="text-xs text-[#757575] mt-0.5">{item.caseNumber}</Text>
        </View>
        <Text className="text-lg font-bold text-[#2E7D32]">{item.amount}</Text>
      </View>

      {/* Tags */}
      <View className="flex-row flex-wrap gap-1.5 mb-2.5">
        {item.tags.map((tag) => (
          <View key={tag} className="border border-[#E0E0E0] rounded-full px-2.5 py-0.5">
            <Text className="text-xs text-[#757575] font-medium">{tag}</Text>
          </View>
        ))}
      </View>

      {/* Status */}
      <View className="flex-row items-center gap-x-2 mb-3">
        <Text className="text-sm text-[#757575]">Status:</Text>
        <View style={{ backgroundColor: getStatusColor(item.status) }} className="rounded-full px-3 py-1">
          <Text className="text-xs font-semibold text-white">{item.status}</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-[#E0E0E0] mb-3" />

      {/* Dates */}
      <View className="flex-row justify-between mb-1.5">
        <Text className="text-sm text-[#757575]">Date of Loss</Text>
        <Text className="text-sm font-medium text-[#212121]">{item.dateOfLoss}</Text>
      </View>
      <View className="flex-row justify-between mb-1.5">
        <Text className="text-sm text-[#757575]">Date Received</Text>
        <Text className="text-sm font-medium text-[#212121]">{item.dateReceived}</Text>
      </View>
      <View className="flex-row justify-between mb-1.5">
        <Text className="text-sm text-[#757575]">Stage Time</Text>
        <Text className="text-sm font-medium text-[#212121]">{item.stageTime}</Text>
      </View>

      {/* View Case Button */}
      <TouchableOpacity
        className="mt-3.5 border-2 border-[#2E7D32] rounded-xl py-3 flex-row items-center justify-center gap-x-2"
        activeOpacity={0.75}
        onPress={() => navigation.navigate("DealsCaseDetails", {
          id: item.id,
          clientName: item.clientName,
          caseNumber: item.caseNumber,
          amount: item.amount,
          status: item.status,
          tags: item.tags,
          dateOfLoss: item.dateOfLoss,
          dateReceived: item.dateReceived,
          stageTime: item.stageTime,
        })}>
        <Text className="text-sm font-semibold text-[#2E7D32]">View Case</Text>
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <Line x1={5} y1={12} x2={19} y2={12} stroke="#2E7D32" strokeWidth={2} strokeLinecap="round" />
          <Polyline points="12 5 19 12 12 19" stroke="#2E7D32" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </TouchableOpacity>

    </View>
  );
};


export default function Deals() {
    const [showSortFilter, setShowSortFilter] = useState(false);
  const [searchQuery, setSearchQuery]       = useState("");
  const [showDropdown, setShowDropdown]     = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Deals");

  const filteredCases = recentCases.filter(
    (c) =>
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.includes(searchQuery)
  );

  return (
    <SafeAreaView className="flex-1 bg-white">

      <Header onFilterPress={() => setShowSortFilter(true)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled">

        {/* Page Title + Dropdown */}
        <View className="mt-5 mb-3">

          {/* Trigger button */}
          <TouchableOpacity
            className="flex-row items-center gap-x-1"
            activeOpacity={0.7}
            onPress={() => setShowDropdown(!showDropdown)}>
            <Text className="text-xl font-bold text-[#212121]">{selectedFilter}</Text>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d={showDropdown ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}
                stroke="#212121" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>

          {/* Dropdown menu */}
          {showDropdown && (
            <View
              className="absolute top-10 left-0 bg-white rounded-xl z-10 w-44"
              style={{ elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 }}>
              {FILTER_OPTIONS.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  className={`px-4 py-3 ${index !== FILTER_OPTIONS.length - 1 ? "border-b border-[#F0F0F0]" : ""}`}
                  onPress={() => {
                    setSelectedFilter(option);
                    setShowDropdown(false);
                  }}>
                  <Text className={`text-sm ${selectedFilter === option ? "font-bold text-[#2E7D32]" : "font-medium text-[#212121]"}`}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-xl border border-[#E0E0E0] px-3.5 mb-5 h-12">
          <TextInput
            className="flex-1 text-base text-[#212121]"
            placeholder="Search Deals"
            placeholderTextColor="#AAAAAA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity className="p-1">
            <Image source={images.searchIcon} style={{ width: 20, height: 20 }} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Overview */}
        <Text className="text-base font-semibold text-[#212121] mb-2.5">Overview</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          {overviewStats.map((item) => (
            <OverviewCard key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* Recent Cases */}
        <Text className="text-base font-semibold text-[#212121] mb-2.5">Recent Cases</Text>
        {filteredCases.length > 0 ? (
          filteredCases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))
        ) : (
          <View className="items-center py-10">
            <Text className="text-sm text-[#AAAAAA]">No cases match your search.</Text>
          </View>
        )}

      </ScrollView>

      {/* Close dropdown when tapping outside */}
      {showDropdown && (
        <TouchableOpacity
          className="absolute inset-0"
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        />
      )}
          <SortFilterModal
      visible={showSortFilter}
      onClose={() => setShowSortFilter(false)}
      onApply={(sort, filter) => {
        console.log(sort, filter);
        setShowSortFilter(false);
      }}
    />

    </SafeAreaView>
    
  );
  
}