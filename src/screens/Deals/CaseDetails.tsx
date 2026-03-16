    import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import images from "../../constant/images";



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

type RouteProps = RouteProp<RootStackParamList, "DealsCaseDetails">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "DealsCaseDetails">;



const decisionInfoData = [
  { label: "Funded Amount",         value: "$90,000.00" },
  { label: "Cash Advance Amount",   value: "$90,000.00" },
  { label: "Doc Fee",               value: "$90,000.00" },
  { label: "Prior Funding Company", value: "Lorem Ipsum" },
  { label: "Prior Funding Payoff",  value: "Lorem Ipsum" },
];

const settlementInfoData = [
  { label: "Settlement Status",  value: "Lorem Ipsum" },
  { label: "Settlement Amount",  value: "$90,000.00"  },
  { label: "Settlement Date",    value: "10/09/2025"  },
  { label: "CK Deposit Amount",  value: "$90,000.00"  },
  { label: "CK Deposit Date",    value: "10/09/2025"  },
];

const treatmentData = [
  { label: "Treatment Type", value: "Physical Therapy" },
  { label: "Provider",       value: "Metro Medical"    },
  { label: "Start Date",     value: "2025-01-10"       },
  { label: "End Date",       value: "2025-04-10"       },
];

const TABS = ["Decision Info", "Settlement Info", "Treatment"];


const getStatusColor = (status: string) => {
  if (status === "Rejected")     return "#E14D4D";
  if (status === "Approved")     return "#8BC240";
  if (status === "Pending")      return "#FF9500";
  if (status === "Under Review") return "#5856D6";
  return "#898989";
};



const InfoRow = ({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) => (
  <View className={`flex-row justify-between py-3 ${!isLast ? "border-b border-[#F0F0F0]" : ""}`}>
    <Text className="text-sm text-[#444]">{label}</Text>
    <Text className="text-sm font-medium text-[#121112] text-right max-w-[180px]">{value}</Text>
  </View>
);

const SectionCard = ({ title, data }: { title: string; data: { label: string; value: string }[] }) => (
  <View
    className="bg-white rounded-2xl border border-[#F4F4F4] px-4 py-3 mb-3"
    style={{ elevation: 4, shadowColor: "#888", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10 }}>
    <Text className="text-base font-bold text-[#121112] mb-1">{title}</Text>
    {data.map((item, index) => (
      <InfoRow
        key={index}
        label={item.label}
        value={item.value}
        isLast={index === data.length - 1}
      />
    ))}
  </View>
);



export default function DealsCaseDetails() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { clientName, caseNumber, amount, status, tags, dateOfLoss, dateReceived, stageTime } = route.params;

  const [activeTab, setActiveTab] = useState("Decision Info");

  const tabData =
    activeTab === "Decision Info"   ? decisionInfoData   :
    activeTab === "Settlement Info" ? settlementInfoData :
    treatmentData;

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">

      {/* ── Header ── */}
      <View className="flex-row items-center bg-white px-5 py-3 border-b border-[#F0F0F0]">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-[44px] h-[44px] rounded-full bg-whitema items-center justify-center">
          <Image source={images.leftArrow} style={{ width: 6, height: 12 }} resizeMode="contain" />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-base font-bold text-[#121112]">Case Details</Text>
        </View>
        <View className="w-[44px]" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}>

        {/* ── Summary Card ── */}
        <View
          className="bg-white rounded-2xl border border-[#F4F4F4] px-4 py-4 mt-4 mb-3"
          style={{ elevation: 4, shadowColor: "#888", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10 }}>

          {/* Summary + Status badge */}
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-bold text-[#121112]">Summary</Text>
            <View style={{ backgroundColor: getStatusColor(status) }} className="rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-white">{status}</Text>
            </View>
          </View>

          {/* Client + Amount */}
          <View className="flex-row justify-between items-start mb-1">
            <View>
              <Text className="text-base font-bold text-[#121112]">{clientName}</Text>
              <Text className="text-xs text-[#757575]">{caseNumber}</Text>
            </View>
            <View className="items-end">
              <Text className="text-base font-bold text-[#121112]">{amount}</Text>
              <Text className="text-xs text-[#757575]">Amount</Text>
            </View>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap gap-1.5 mt-3 mb-4">
            {tags.map((tag) => (
              <View key={tag} className="border border-[#E0E0E0] rounded-full px-2.5 py-0.5">
                <Text className="text-xs text-[#757575] font-medium">{tag}</Text>
              </View>
            ))}
          </View>

          {/* Lawyer + Case Manager */}
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#444]">Lawyer</Text>
            <Text className="text-sm font-medium text-[#2E7D32]">John Doe</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-sm text-[#444]">Case Manager</Text>
            <Text className="text-sm font-medium text-[#2E7D32]">Kyrie Irving</Text>
          </View>

          {/* Divider */}
          <View className="h-px bg-[#F0F0F0] mb-3" />

          {/* Dates */}
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#444]">Date of Loss</Text>
            <Text className="text-sm font-medium text-[#121112]">{dateOfLoss}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#444]">Date Received</Text>
            <Text className="text-sm font-medium text-[#121112]">{dateReceived}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-[#444]">Stage Time</Text>
            <Text className="text-sm font-medium text-[#121112]">{stageTime}</Text>
          </View>

        </View>

        {/* ── Tab Bar ── */}
        <View
          className="flex-row bg-white rounded-xl mb-3 border border-[#F0F0F0]"
          style={{ elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 }}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="flex-1 items-center py-3">
              <Text className={`text-xs font-semibold ${activeTab === tab ? "text-[#2E7D32]" : "text-[#9E9E9E]"}`}>
                {tab}
              </Text>
              {activeTab === tab && (
                <View className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2E7D32] rounded-full" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Tab Content ── */}
        <SectionCard title={activeTab} data={tabData} />

      </ScrollView>

      {/* ── Update Actions Button ── */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pt-3 pb-8 bg-white border-t border-[#F0F0F0]">
        <TouchableOpacity
          className="h-14 rounded-2xl bg-[#8BC240] items-center justify-center"
          activeOpacity={0.8}>
          <Text className="text-white text-base font-semibold">Update Actions</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}