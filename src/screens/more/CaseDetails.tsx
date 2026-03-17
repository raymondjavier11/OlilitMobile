import React, { useRef, useState } from "react";
import { View, Text, Image, Pressable, ScrollView,TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import images from "../../constant/images";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  CaseDetails: {
    name: string;
    phone: string;
    address: string;
    type: string;
  };
};

type RouteProps = RouteProp<RootStackParamList, "CaseDetails">;

export default function CaseDetails() {

  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { name, phone, address,type } = route.params;

  const sectionPositions = useRef({
  general: 0,
  address: 0,
  contact: 0,
  notes: 0,
});
const isScrollingByTab = useRef(false);

  const scrollRef = useRef<ScrollView>(null);
  const generalRef = useRef<View>(null);
  const addressRef = useRef<View>(null);
  const contactRef = useRef<View>(null);
  const notesRef = useRef<View>(null);

  const [activeTab, setActiveTab] = useState("general");

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

  if (isScrollingByTab.current) return;

  const y = event.nativeEvent.contentOffset.y;

  const { general, address, contact, notes } = sectionPositions.current;

  if (y >= notes - 120) {
    setActiveTab("notes");
  } else if (y >= contact - 120) {
    setActiveTab("contact");
  } else if (y >= address - 120) {
    setActiveTab("address");
  } else {
    setActiveTab("general");
  }
};

const scrollToSection = (ref: any, tab: string) => {
  if (!ref.current || !scrollRef.current) return;

  ref.current.measureLayout(
    scrollRef.current,
    (x: number, y: number) => {
      scrollRef.current?.scrollTo({
        y: y - 50,
        animated: true,
      });
    }
  );

  setActiveTab(tab);
};

const contacts = [
  {
    id: 1,
    name: "Choi, Kenneth",
    role: "Injured Party",
    company: "ABC Company",
    phone: "61239001123",
    date: "December 20 2025",
  },
  {
    id: 2,
    name: "Garcia, Maria",
    role: "Witness",
    company: "Global Tech Ltd.",
    phone: "98765432100",
    date: "January 10 2026",
  },
  {
    id: 3,
    name: "Smith, John",
    role: "Claimant",
    company: "Prime Holdings",
    phone: "44556677889",
    date: "February 02 2026",
  },
  {
    id: 4,
    name: "Lopez, Angela",
    role: "Adjuster",
    company: "Everest Insurance",
    phone: "22334455667",
    date: "March 05 2026",
  },
];

const [notes, setNotes] = useState([
  {
    id: 1,
    name: "Barry Gould",
    email: "BarryGould.email.com",
    time: "1 hour ago",
    message: "Hi team, the discovery documents for the Morrison case are done",
  },
  {
    id: 2,
    name: "Barry Gould",
    email: "BarryGould.email.com",
    time: "1 hour ago",
    message: "Hi team, the discovery documents for the Morrison case are done",
  },
  {
    id: 3,
    name: "Barry Gould",
    email: "BarryGould.email.com",
    time: "1 hour ago",
    message: "Hi team, the discovery documents for the Morrison case are done",
  },
  {
    id: 4,
    name: "Barry Gould",
    email: "BarryGould.email.com",
    time: "1 hour ago",
    message: "Hi team, the discovery documents for the Morrison case are done",
  },
]);

const [newNote, setNewNote] = useState("");

const handleAddNote = () => {
  if (newNote.trim() === "") return;

  const note = {
    id: Date.now(),
    name: "Barry Gould",
    email: "BarryGould.email.com",
    time: "Just now",
    message: newNote,
  };

  setNotes([note, ...notes]);
  setNewNote("");
};


  return (

  <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 bg-white ">

      <View className="flex-row items-center mt-3 mb-[20px] px-[24px]">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
          <Image source={images.leftArrow} className="w-[6px] h-[12px]" />
        </Pressable>

        <View className="flex-1 items-center">
          <Text className="text-[16px] font-jakarta-bold">
            Case Details
          </Text>
        </View>

        <View className="w-[44px]" />
      </View>

      <ScrollView ref={scrollRef} stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false} onScroll={handleScroll}
        contentContainerStyle={{paddingBottom: 150 }}>
        <View className="px-[24px]">
            <View
            className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mb-5 "
            style={{shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
                shadowRadius: 10, elevation: 8,}}>
            <View className="flex-row justify-between items-center">
                <Text className="font-jakarta-medium text-[14px]">
                    {name}
                </Text>

                <View className="flex-row items-center gap-2 rounded-[12px] bg-[#8BC2401A] p-[8px]">
                <Image className="w-[10px] h-[10px]" source={images.company} />
                <Text className="font-jakarta-medium text-[10px]">
                    {type}
                </Text>
                </View>
            </View>     

            <View className="flex-row items-center gap-3 mt-3">
                <Image className="w-[12px] h-[12px]" source={images.phoneIcon} />
                <Text className="font-jakarta-medium text-[12px]">
                    {phone}
                </Text>
            </View>

            <View className="flex-row items-center gap-3 mt-3">
                <Image className="w-[12px] h-[12px]" source={images.locationIcon} />
                <Text className="font-jakarta-medium text-[12px]">
                    {address}
                </Text>
            </View>
            </View>
        </View>

        <View className="bg-white border-b border-[#EAEAEA] px-6" 
                style={{ zIndex: 10, elevation: 10 }}>
          <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false} >
            <View className="flex-row">

              <Pressable
                onPress={() => scrollToSection(generalRef, "general")}
                className="mr-6 pb-3">
                <Text
                  className={`text-[13px] ${
                    activeTab === "general"
                      ? "text-[#8BC240] border-b-2 border-[#8BC240]"
                      : "text-[#8A8A8A]"}`}>
                  General Information
                </Text>
              </Pressable>

              <Pressable
                onPress={() => scrollToSection(addressRef, "address")}
                className="mr-6 pb-3">
                <Text
                  className={`text-[13px] ${
                    activeTab === "address"
                      ? "text-[#8BC240] border-b-2 border-[#8BC240]"
                      : "text-[#8A8A8A]"}`}>
                  Address Information
                </Text>
              </Pressable>

              <Pressable
                onPress={() => scrollToSection(contactRef, "contact")}
                className="mr-6 pb-3">
                <Text
                  className={`text-[13px] ${
                    activeTab === "contact"
                      ? "text-[#8BC240] border-b-2 border-[#8BC240]"
                      : "text-[#8A8A8A]"}`}>
                  Contact 
                </Text>
              </Pressable>

              <Pressable
                onPress={() => scrollToSection(notesRef, "notes")}
                className="mr-6 pb-3">
                <Text
                  className={`text-[13px] ${
                    activeTab === "notes"
                      ? "text-[#8BC240] border-b-2 border-[#8BC240]"
                      : "text-[#8A8A8A]"}`}>
                  Notes
                </Text>
              </Pressable> 

            </View>
          </ScrollView>
        </View>

        {/* GENERAL */}
        <View ref={generalRef} onLayout={(e) => {
            sectionPositions.current.general = e.nativeEvent.layout.y;}}
            className="mt-6 px-[24px]">

         <View className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-1"
            style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
            shadowRadius: 10, elevation: 4,}}>
            
            <Text className="font-jakarta-bold text-[14px] mb-4">
              General Information
            </Text>

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Referred by Person 
                </Text>

                <Text className="text-[12px] mb-2">
                    Lorem Ipsum
                </Text>
            </View>   
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Lead Source 
                </Text>

                <Text className="text-[12px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Bad Firm List
                </Text>

                <Text className="text-[12px] mb-2">
                    No
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Firm Software
                </Text>

                <Text className="text-[12px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />
            
            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Phone 2
                </Text>

                <Text className="text-[12px] mb-2">
                    091233111133
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Rating
                </Text>

                <Text className="text-[12px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Fax
                </Text>

                <Text className="text-[12px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Company Owner
                </Text>

                <Text className="text-[12px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 

          </View>           
        </View>

        {/* ADDRESS */}
        <View ref={addressRef} onLayout={(e) => {
            sectionPositions.current.address = e.nativeEvent.layout.y;}}
            className="mt-8 px-[24px]">

          <View className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-1"
            style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
            shadowRadius: 10, elevation: 4,}}>
            
            <Text className="font-jakarta-bold text-[14px] mb-4">
              Address Information
            </Text>

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Street
                </Text>

                <Text className="text-[12px] mb-2">
                    $ 90,000.00
                </Text>
            </View>   
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Street 2
                </Text>

                <Text className="text-[12px] mb-2">
                    $ 90,000.00
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Code
                </Text>

                <Text className="text-[12px] mb-2">
                    $ 90,000.00
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    City
                </Text>

                <Text className="text-[12px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />
            
            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    State
                </Text>

                <Text className="text-[12px] mb-2">
                    091233111133
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Country
                </Text>

                <Text className="text-[12px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="text-[12px] mb-2">
                    Fax
                </Text>

                <Text className="text-[12px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
          </View>
        </View>

        {/* CONTACT */}
        <View ref={contactRef}
            onLayout={(e) => {
                sectionPositions.current.contact = e.nativeEvent.layout.y;
            }}
            className="mt-4 px-[24px]">

            <Text className="font-jakarta-bold text-[16px] mb-[5px]">
                Contacts
            </Text>

            {contacts.map((contact) => (
                <View
                key={contact.id}
                className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-3"
                style={{shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
                    shadowRadius: 10, elevation: 4, }}>

                <View className="flex-row justify-between items-center">
                    <Text className="font-jakarta-medium text-[14px]">
                    {contact.name}
                    </Text>

                    <View className="flex-row items-center gap-2 rounded-[12px] bg-[#7E7E7E1A] p-[8px]">
                    <Image
                        className="w-[10px] h-[10px]"
                        source={images.gearPersonIcon}
                    />
                    <Text className="font-jakarta-medium text-[10px]">
                        {contact.role}
                    </Text>
                    </View>
                </View>

                <Text className="font-jakarta text-[12px]">
                    {contact.company}
                </Text>

                <View className="flex-row items-center gap-3 mt-3">
                    <Image
                    className="w-[12px] h-[12px]"
                    source={images.phoneIcon}
                    />
                    <Text className="font-jakarta-medium text-[12px]">
                    {contact.phone}
                    </Text>
                </View>

                <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[5px]" />

                <View className="flex-row justify-between items-center">
                    <Text className="font-jakarta text-[12px]">
                    Registration Date
                    </Text>

                    <Text className="font-jakarta-medium text-[12px]">
                    {contact.date}
                    </Text>
                </View>

                </View>
            ))}

            </View>

        {/* Notes */}
        <View ref={notesRef} onLayout={(e) => {
            sectionPositions.current.notes = e.nativeEvent.layout.y;}}
                className="mt-8 px-[24px]">

            <Text className="font-jakarta-bold text-[16px] mb-[5px]">
                Notes
            </Text>

            {notes.map((note) => (
            <View key={note.id} className="flex-row bg-white rounded-[16px] p-[16px] mb-[14px]"
                style={{shadowColor: "#888",shadowOffset: { width: 0, height: 10 },shadowOpacity: 0.05,
                shadowRadius: 10,elevation: 4, }}>
                
                <View className="w-[40px] h-[40px] rounded-full bg-[#E5E7EB] items-center justify-center">
                    <Image
                        source={images.girlIcon}
                        className="w-[38px] h-[40px]"
                        resizeMode="contain"/>
                </View>             

                <View className="flex-1 ml-[12px]">

                <Text className="font-jakarta-medium text-[14px]">
                    {note.name}
                </Text>

                <Text className="text-[11px] text-[#9CA3AF] mt-[2px]">
                    {note.email} • {note.time}
                </Text>

                <Text className="text-[12px] text-[#6B7280] font-semibold mt-[6px]">
                    {note.message}
                </Text>
        
                </View>

            </View>))}        
         
        </View>

        <View className="flex-row items-center justify-between mt-4 border-t border-[#EAEAEA] pt-4 px-[24px]">

            <TextInput placeholder="Add a note"
                value={newNote} onChangeText={setNewNote} className="flex-1 text-[14px]"/>

            <Pressable
                onPress={handleAddNote}
                className="flex-row items-center gap-2 bg-[#8BC240] px-[20px] py-[10px] rounded-[8px]"      >
                <Text className="text-white font-jakarta-medium">
                    Submit
                </Text>

                <Image
                    source={images.planeIcon}
                    className="w-[14px] h-[14px]"/>
            </Pressable>

        </View>

      </ScrollView>
    </View>
  </SafeAreaView>
  );
}