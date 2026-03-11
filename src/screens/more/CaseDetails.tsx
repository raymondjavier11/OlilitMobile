import React, { useRef, useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import images from "../../constant/images";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

export default function CaseDetails() {
  const navigation = useNavigation();

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
        y: y - 50, // offset for tabs/header
        animated: true,
      });
    }
  );

  setActiveTab(tab);
};
  return (
    <View className="flex-1 bg-white ">

      <View className="flex-row items-center mt-12 mb-[20px] px-[24px]">
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
        contentContainerStyle={{paddingBottom: 60 }}>
        <View className="px-[24px]">
            <View
            className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mb-5 "
            style={{shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
                shadowRadius: 10, elevation: 8,}}>
            <View className="flex-row justify-between items-center">
                <Text className="font-jakarta-medium text-[14px]">
                ABC Company
                </Text>

                <View className="flex-row items-center gap-2 rounded-[12px] bg-[#8BC2401A] p-[8px]">
                <Image className="w-[10px] h-[10px]" source={images.company} />
                <Text className="font-jakarta-medium text-[10px]">
                    Company Type
                </Text>
                </View>
            </View>

            <View className="flex-row items-center gap-3 mt-3">
                <Image className="w-[12px] h-[12px]" source={images.phoneIcon} />
                <Text className="font-jakarta-medium text-[12px]">
                61239001123
                </Text>
            </View>

            <View className="flex-row items-center gap-3 mt-3">
                <Image className="w-[12px] h-[12px]" source={images.locationIcon} />
                <Text className="font-jakarta-medium text-[12px]">
                3578 Hiney Road, Nevada, Las Vegas
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
        <View ref={contactRef} onLayout={(e) => { sectionPositions.current.contact = e.nativeEvent.layout.y; }}
            className="mt-8 px-[24px]">

          <Text className="font-jakarta-bold text-[16px] mb-[5px]">Contacts</Text>

          <View className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-1"
            style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
            shadowRadius: 10, elevation: 4,}}>

                
            
          </View>

        </View>

        {/* Notes */}
        <View ref={notesRef} onLayout={(e) => {
            sectionPositions.current.notes = e.nativeEvent.layout.y;}}
                className="mt-8 px-[24px]">

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

      </ScrollView>
    </View>
  );
}