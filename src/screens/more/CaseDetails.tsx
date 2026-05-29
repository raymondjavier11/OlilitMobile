import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, Pressable, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import images from "../../constant/images";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = "http://10.0.2.2:5000/api/case-details";

type RootStackParamList = {
  CaseDetails: {
    companyId: string; 
    name: string;
    phone: string;
    address: string;
    type: string;
  };
};

type RouteProps = RouteProp<RootStackParamList, "CaseDetails">;

type GeneralInfo = {
  referredByPerson: string;
  leadSource: string;
  badFirmList: string;
  firmSoftware: string;
  phone2: string;
  rating: string;
  fax: string;
  companyOwner: string;
};

type AddressInfo = {
  street: string;
  street2: string;
  code: string;
  city: string;
  state: string;
  country: string;
  fax: string;
};

type Contact = {
  _id: string;
  name: string;
  role: string;
  company: string;
  phone: string;
  date: string;
};

type Note = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function CaseDetails() {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { companyId, name, phone, address, type } = route.params;

  const [generalInfo, setGeneralInfo] = useState<GeneralInfo | null>(null);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sectionPositions = useRef({ general: 0, address: 0, contact: 0, notes: 0 });
  const isScrollingByTab = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
  const generalRef = useRef<View>(null);
  const addressRef = useRef<View>(null);
  const contactRef = useRef<View>(null);
  const notesRef = useRef<View>(null);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/${companyId}`);
        if (!res.ok) throw new Error("Failed to fetch case details");

        const data = await res.json();
        setGeneralInfo(data.company.generalInfo);
        setAddressInfo(data.company.addressInfo);
        setContacts(data.contacts);
        setNotes(data.notes);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Hindi ma-load ang case details. Subukan ulit.");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [companyId]);

  const handleAddNote = async () => {
    if (newNote.trim() === "") return;
    try {
      setSubmitting(true);
      const res = await fetch(`${BASE_URL}/${companyId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Barry Gould",
          email: "barry@email.com",
          message: newNote,
        }),
      });

      if (!res.ok) throw new Error("Failed to add note");
      const savedNote: Note = await res.json();
      setNotes([savedNote, ...notes]);
      setNewNote("");
    } catch (err) {
      console.error("Note error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimeAgo = (isoString: string) => {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) > 1 ? "s" : ""} ago`;
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrollingByTab.current) return;
    const y = event.nativeEvent.contentOffset.y;
    const { general, address, contact, notes: notesY } = sectionPositions.current;
    if (y >= notesY - 120) setActiveTab("notes");
    else if (y >= contact - 120) setActiveTab("contact");
    else if (y >= address - 120) setActiveTab("address");
    else setActiveTab("general");
  };

  const scrollToSection = (ref: any, tab: string) => {
    if (!ref.current || !scrollRef.current) return;
    isScrollingByTab.current = true;
    setActiveTab(tab);
    ref.current.measureLayout(scrollRef.current, (x: number, y: number) => {
      scrollRef.current?.scrollTo({ y: y - 50, animated: true });
      setTimeout(() => { isScrollingByTab.current = false; }, 600);
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">

        <View className="flex-row items-center mt-3 mb-[20px] px-[24px]">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
            <Image source={images.leftArrow} className="w-[6px] h-[12px]" />
          </Pressable>
          <View className="flex-1 items-center">
            <Text className="text-[16px] font-jakarta-bold">Case Details</Text>
          </View>
          <View className="w-[44px]" />
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#8BC240" />
            <Text className="text-gray-400 mt-3">Loading case details...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-red-400 text-center">{error}</Text>
          </View>
        ) : (
          <ScrollView
            ref={scrollRef}
            stickyHeaderIndices={[1]}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            contentContainerStyle={{ paddingBottom: 150 }}>

            {/* Company Card */}
            <View className="px-[24px]">
              <View className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mb-5"
                style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 8 }}>
                <View className="flex-row justify-between items-center">
                  <Text className="font-jakarta-medium text-[14px]">{name}</Text>
                  <View className="flex-row items-center gap-2 rounded-[12px] bg-[#8BC2401A] p-[8px]">
                    <Image className="w-[10px] h-[10px]" source={images.company} />
                    <Text className="font-jakarta-medium text-[10px]">{type}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 mt-3">
                  <Image className="w-[12px] h-[12px]" source={images.phoneIcon} />
                  <Text className="font-jakarta-medium text-[12px]">{phone}</Text>
                </View>
                <View className="flex-row items-center gap-3 mt-3">
                  <Image className="w-[12px] h-[12px]" source={images.locationIcon} />
                  <Text className="font-jakarta-medium text-[12px]">{address}</Text>
                </View>
              </View>
            </View>

            {/* Tab Bar */}
            <View className="bg-white border-b border-[#EAEAEA] px-6" style={{ zIndex: 10, elevation: 10 }}>
              <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  {[
                    { key: "general", label: "General Information", ref: generalRef },
                    { key: "address", label: "Address Information", ref: addressRef },
                    { key: "contact", label: "Contact", ref: contactRef },
                    { key: "notes", label: "Notes", ref: notesRef },
                  ].map((tab) => (
                    <Pressable key={tab.key} onPress={() => scrollToSection(tab.ref, tab.key)} className="mr-6 pb-3">
                      <Text className={`text-[13px] ${activeTab === tab.key ? "text-[#8BC240] border-b-2 border-[#8BC240]" : "text-[#8A8A8A]"}`}>
                        {tab.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* GENERAL INFO */}
            <View ref={generalRef} onLayout={(e) => { sectionPositions.current.general = e.nativeEvent.layout.y; }} className="mt-6 px-[24px]">
              <View className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-1"
                style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 }}>
                <Text className="font-jakarta-bold text-[14px] mb-4">General Information</Text>

                {[
                  { label: "Referred by Person", value: generalInfo?.referredByPerson },
                  { label: "Lead Source",         value: generalInfo?.leadSource },
                  { label: "Bad Firm List",        value: generalInfo?.badFirmList },
                  { label: "Firm Software",        value: generalInfo?.firmSoftware },
                  { label: "Phone 2",              value: generalInfo?.phone2 },
                  { label: "Rating",               value: generalInfo?.rating },
                  { label: "Fax",                  value: generalInfo?.fax },
                  { label: "Company Owner",        value: generalInfo?.companyOwner },
                ].map((item, i) => (
                  <View key={i}>
                    <View className="flex-row justify-between">
                      <Text className="text-[12px] mb-2">{item.label}</Text>
                      <Text className="text-[12px] mb-2">{item.value || "—"}</Text>
                    </View>
                    {i < 7 && <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />}
                  </View>
                ))}
              </View>
            </View>

            {/* ADDRESS INFO */}
            <View ref={addressRef} onLayout={(e) => { sectionPositions.current.address = e.nativeEvent.layout.y; }} className="mt-8 px-[24px]">
              <View className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-1"
                style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 }}>
                <Text className="font-jakarta-bold text-[14px] mb-4">Address Information</Text>

                {[
                  { label: "Street",   value: addressInfo?.street },
                  { label: "Street 2", value: addressInfo?.street2 },
                  { label: "Code",     value: addressInfo?.code },
                  { label: "City",     value: addressInfo?.city },
                  { label: "State",    value: addressInfo?.state },
                  { label: "Country",  value: addressInfo?.country },
                  { label: "Fax",      value: addressInfo?.fax },
                ].map((item, i) => (
                  <View key={i}>
                    <View className="flex-row justify-between">
                      <Text className="text-[12px] mb-2">{item.label}</Text>
                      <Text className="text-[12px] mb-2">{item.value || "—"}</Text>
                    </View>
                    {i < 6 && <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />}
                  </View>
                ))}
              </View>
            </View>

            {/* CONTACTS */}
            <View ref={contactRef} onLayout={(e) => { sectionPositions.current.contact = e.nativeEvent.layout.y; }} className="mt-4 px-[24px]">
              <Text className="font-jakarta-bold text-[16px] mb-[5px]">Contacts</Text>

              {contacts.length === 0 ? (
                <Text className="text-gray-400 text-center mt-4">No contacts yet</Text>
              ) : contacts.map((contact) => (
                <View key={contact._id}
                  className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-3"
                  style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 }}>
                  <View className="flex-row justify-between items-center">
                    <Text className="font-jakarta-medium text-[14px]">{contact.name}</Text>
                    <View className="flex-row items-center gap-2 rounded-[12px] bg-[#7E7E7E1A] p-[8px]">
                      <Image className="w-[10px] h-[10px]" source={images.gearPersonIcon} />
                      <Text className="font-jakarta-medium text-[10px]">{contact.role}</Text>
                    </View>
                  </View>
                  <Text className="font-jakarta text-[12px]">{contact.company}</Text>
                  <View className="flex-row items-center gap-3 mt-3">
                    <Image className="w-[12px] h-[12px]" source={images.phoneIcon} />
                    <Text className="font-jakarta-medium text-[12px]">{contact.phone}</Text>
                  </View>
                  <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[5px]" />
                  <View className="flex-row justify-between items-center">
                    <Text className="font-jakarta text-[12px]">Registration Date</Text>
                    <Text className="font-jakarta-medium text-[12px]">{contact.date}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* NOTES */}
            <View ref={notesRef} onLayout={(e) => { sectionPositions.current.notes = e.nativeEvent.layout.y; }} className="mt-8 px-[24px]">
              <Text className="font-jakarta-bold text-[16px] mb-[5px]">Notes</Text>

              {notes.length === 0 ? (
                <Text className="text-gray-400 text-center mt-4">No notes yet</Text>
              ) : notes.map((note) => (
                <View key={note._id} className="flex-row bg-white rounded-[16px] p-[16px] mb-[14px]"
                  style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 }}>
                  <View className="w-[40px] h-[40px] rounded-full bg-[#E5E7EB] items-center justify-center">
                    <Image source={images.girlIcon} className="w-[38px] h-[40px]" resizeMode="contain" />
                  </View>
                  <View className="flex-1 ml-[12px]">
                    <Text className="font-jakarta-medium text-[14px]">{note.name}</Text>
                    <Text className="text-[11px] text-[#9CA3AF] mt-[2px]">
                      {note.email} • {formatTimeAgo(note.createdAt)}
                    </Text>
                    <Text className="text-[12px] text-[#6B7280] font-semibold mt-[6px]">{note.message}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Add Note Input */}
            <View className="flex-row items-center justify-between mt-4 border-t border-[#EAEAEA] pt-4 px-[24px]">
              <TextInput
                placeholder="Add a note"
                value={newNote}
                onChangeText={setNewNote}
                className="flex-1 text-[14px]"
                editable={!submitting}
              />
              <Pressable
                onPress={handleAddNote}
                disabled={submitting}
                className="flex-row items-center gap-2 bg-[#8BC240] px-[20px] py-[10px] rounded-[8px]">
                <Text className="text-white font-jakarta-medium">
                  {submitting ? "Sending..." : "Submit"}
                </Text>
                <Image source={images.planeIcon} className="w-[14px] h-[14px]" />
              </Pressable>
            </View>

          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
