import React, { useRef, useState } from "react";
import {
  View, Text, Image, TouchableOpacity, ScrollView,
  Pressable, TextInput,
} from "react-native";
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
  { label: "Funded Amount",         value: "$90,000.00"  },
  { label: "Cash Advance Amount",   value: "$90,000.00"  },
  { label: "Doc Fee",               value: "$90,000.00"  },
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
  { label: "Current Stage", value: "Lorem Ipsum" },
  { label: "Last Update",   value: "Lorem Ipsum" },
];

const notesData = [
  {
    id: "1",
    name: "Barry Gould",
    email: "BarryGould.email.com",
    time: "1 hour ago",
    message: "Hi team, the discovery documents for the Morrison case are done",
  },
  {
    id: "2",
    name: "Barry Gould",
    email: "BarryGould.email.com",
    time: "1 hour ago",
    message: "Hi team, the discovery documents for the Morrison case are done",
  },
  {
    id: "3",
    name: "Barry Gould",
    email: "BarryGould.email.com",
    time: "1 hour ago",
    message: "Hi team, the discovery documents for the Morrison case are done",
  },
];

const TABS = ["Decision Info", "Settlement Info", "Treatment", "Notes"];



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

const NoteCard = ({ item }: { item: typeof notesData[0] }) => (
  <View
    className="bg-white rounded-2xl border border-[#F4F4F4] px-4 py-3 mb-3 flex-row gap-x-3"
    style={{ elevation: 2, shadowColor: "#888", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6 }}>
    <View className="w-10 h-10 rounded-full bg-[#E0E0E0] items-center justify-center">
      <Text className="text-sm font-bold text-[#757575]">{item.name.charAt(0)}</Text>
    </View>
    <View className="flex-1">
      <View className="flex-row items-center flex-wrap gap-x-1">
        <Text className="text-sm font-bold text-[#121112]">{item.name}</Text>
        <Text className="text-xs text-[#757575]">{item.email}</Text>
        <Text className="text-xs text-[#8BC240]">• {item.time}</Text>
      </View>
      <Text className="text-sm text-[#444] mt-1">{item.message}</Text>
    </View>
  </View>
);



export default function DealsCaseDetails() {
  const navigation = useNavigation<NavigationProp>();
  const route      = useRoute<RouteProps>();
  const { clientName, caseNumber, amount, status, tags, dateOfLoss, dateReceived, stageTime } = route.params;

  const [activeTab, setActiveTab]       = useState("Decision Info");
  const [noteText, setNoteText]         = useState("");
  const [isScrolling, setIsScrolling]   = useState(false);
  const [showStickyTab, setShowStickyTab] = useState(false);

  const summaryBottom = useRef(0);

  const scrollRef     = useRef<ScrollView>(null);
  const decisionRef   = useRef<any>(null);
  const settlementRef = useRef<any>(null);
  const treatmentRef  = useRef<any>(null);
  const notesRef      = useRef<any>(null);

  // Stored Y positions — set via onLayout, relative to ScrollView content
  const offsets = useRef({ decision: 0, settlement: 0, treatment: 0, notes: 0 });

  // Auto-highlight tab based on scroll position
  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY    = contentOffset.y;
    const maxScrollY = contentSize.height - layoutMeasurement.height;
    const buffer     = 60;
    const o          = offsets.current;

    // Show sticky tab bar pag nalagpasan na ang summary
    setShowStickyTab(scrollY > summaryBottom.current);

    if (isScrolling) return;

    // Auto-highlight
    if (scrollY >= maxScrollY - 10) {
      setActiveTab("Notes");
    } else if (o.notes > 0 && scrollY >= o.notes - buffer) {
      setActiveTab("Notes");
    } else if (o.treatment > 0 && scrollY >= o.treatment - buffer) {
      setActiveTab("Treatment");
    } else if (o.settlement > 0 && scrollY >= o.settlement - buffer) {
      setActiveTab("Settlement Info");
    } else {
      setActiveTab("Decision Info");
    }
  };

  // Scroll to section on tab press — disable auto-highlight while scrolling
  const scrollToSection = (tab: string) => {
    const map: Record<string, number> = {
      "Decision Info":   offsets.current.decision,
      "Settlement Info": offsets.current.settlement,
      "Treatment":       offsets.current.treatment,
      "Notes":           offsets.current.notes,
    };
    setActiveTab(tab);
    setIsScrolling(true);
    scrollRef.current?.scrollTo({ y: (map[tab] ?? 0) - 10, animated: true });

    // Re-enable auto-highlight after scroll animation finishes
    setTimeout(() => setIsScrolling(false), 600);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">

      {/* ── Header ── */}
      <View className="flex-row items-center bg-white px-5 py-3 border-b border-[#F0F0F0]">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-[44px] h-[44px] rounded-full bg-[#F3F2F2] items-center justify-center">
          <Image source={images.leftArrow} style={{ width: 6, height: 12 }} resizeMode="contain" />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-base font-bold text-[#121112]">Case Details</Text>
        </View>
        <View className="w-[44px]" />
      </View>

      {/* ── Tab Bar — sticky pag nalagpasan na ang summary ── */}
      {showStickyTab && (
        <View className="flex-row border-b-2 border-[#E0E0E0] bg-white">
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => scrollToSection(tab)}
              className="flex-1 items-center pb-3 pt-2">
              <Text className={`text-[10px] font-semibold ${activeTab === tab ? "text-[#2E7D32]" : "text-[#9E9E9E]"}`}>
                {tab}
              </Text>
              {activeTab === tab && (
                <View className="absolute bottom-0 left-0 right-0 bg-[#2E7D32]" style={{ height: 2 }} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 300 }}>

        {/* ── Summary Card ── */}
        <View
          className="bg-white rounded-2xl border border-[#F4F4F4] px-4 py-4 mt-4 mb-3"
          onLayout={(e) => {
            const { y, height } = e.nativeEvent.layout;
            summaryBottom.current = y + height;
          }}
          style={{ elevation: 4, shadowColor: "#888", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10 }}>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-bold text-[#121112]">Summary</Text>
            <View style={{ backgroundColor: getStatusColor(status) }} className="rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-white">{status}</Text>
            </View>
          </View>

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

          <View className="flex-row flex-wrap gap-1.5 mt-3 mb-4">
            {tags.map((tag) => (
              <View key={tag} className="border border-[#E0E0E0] rounded-full px-2.5 py-0.5">
                <Text className="text-xs text-[#757575] font-medium">{tag}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#444]">Lawyer</Text>
            <Text className="text-sm font-medium text-[#2E7D32]">John Doe</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-sm text-[#444]">Case Manager</Text>
            <Text className="text-sm font-medium text-[#2E7D32]">Kyrie Irving</Text>
          </View>

          <View className="h-px bg-[#F0F0F0] mb-3" />

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

        {/* ── Tab Bar — visible below summary before scrolling ── */}
        {!showStickyTab && (
          <View className="flex-row border-b-2 border-[#E0E0E0] bg-white mb-2">
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => scrollToSection(tab)}
                className="flex-1 items-center pb-3 pt-2">
                <Text className={`text-[10px] font-semibold ${activeTab === tab ? "text-[#2E7D32]" : "text-[#9E9E9E]"}`}>
                  {tab}
                </Text>
                {activeTab === tab && (
                  <View className="absolute bottom-0 left-0 right-0 bg-[#2E7D32]" style={{ height: 2 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── Decision Info ── */}
        <View
          ref={decisionRef}
          onLayout={(e) => { offsets.current.decision = e.nativeEvent.layout.y; }}>
          <SectionCard title="Decision Info" data={decisionInfoData} />
        </View>

        {/* ── Settlement Info ── */}
        <View
          ref={settlementRef}
          onLayout={(e) => { offsets.current.settlement = e.nativeEvent.layout.y; }}>
          <SectionCard title="Settlement Info" data={settlementInfoData} />
        </View>

        {/* ── Treatment ── */}
        <View
          ref={treatmentRef}
          onLayout={(e) => { offsets.current.treatment = e.nativeEvent.layout.y; }}>
          <SectionCard title="Treatment" data={treatmentData} />
        </View>

        {/* ── Notes ── */}
        <View
          ref={notesRef}
          onLayout={(e) => { offsets.current.notes = e.nativeEvent.layout.y; }}>
          <Text className="text-base font-bold text-[#121112] mb-3">Notes</Text>
          {notesData.map((note) => (
            <NoteCard key={note.id} item={note} />
          ))}
        </View>

      </ScrollView>

      {/* ── Bottom Button ── */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pt-3 pb-8 bg-white border-t border-[#F0F0F0]">
        {activeTab === "Notes" ? (
          <View className="flex-row items-center gap-x-3">
            <TextInput
              className="flex-1 h-12 bg-[#F5F5F5] rounded-xl px-4 text-sm text-[#121112] border border-[#E0E0E0]"
              placeholder="Add a note"
              placeholderTextColor="#AAAAAA"
              value={noteText}
              onChangeText={setNoteText}
            />
            <TouchableOpacity
              className="h-12 px-5 bg-[#8BC240] rounded-xl items-center justify-center"
              activeOpacity={0.8}>
              <Text className="text-white text-sm font-semibold">Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="h-14 rounded-2xl bg-[#8BC240] items-center justify-center"
            activeOpacity={0.8}>
            <Text className="text-white text-base font-semibold">Update Actions</Text>
          </TouchableOpacity>
        )}
      </View>

    </SafeAreaView>
  );
}