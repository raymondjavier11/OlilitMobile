import React, { useRef, useState } from "react";
import { View, Text, Image, Pressable, ScrollView,TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import images from "../../constant/images";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  ContactsDetails: {
    name: string;
    phone: string;
    address: string;
    type: string;
    personName: string
  };
};

type RouteProps = RouteProp<RootStackParamList, "ContactsDetails">;

export default function ContactsDetails() {

  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { name, phone, address,type,personName } = route.params;

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

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const y = contentOffset.y;

    const { general, address, contact } = sectionPositions.current;

    const isBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;

    if (isBottom) {
        setActiveTab("contact");
        return;
    }

    if (y >= contact - 150) {
        setActiveTab("contact");
    } else if (y >= address - 150 && y < contact - 150) {
        setActiveTab("address");
    } else {
        setActiveTab("general");
    }
    };

    const scrollToSection = (ref: any, tab: string) => {
    if (!ref.current || !scrollRef.current) return;

    isScrollingByTab.current = true; // start tab scroll

    ref.current.measureLayout(
        scrollRef.current,
        (x: number, y: number) => {
        scrollRef.current?.scrollTo({
            y: y - 50,
            animated: true,
        });

        setTimeout(() => {
            isScrollingByTab.current = false; // allow scroll detection again
        }, 400);
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
            Contacts Details
          </Text>
        </View>

        <View className="w-[44px]" />
      </View>

      <ScrollView ref={scrollRef} stickyHeaderIndices={[1]}
            showsVerticalScrollIndicator={false} onScroll={handleScroll}
            contentContainerStyle={{ paddingBottom: 250 }}>

        <View className="px-[24px]">

            <View
                className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mb-5 "
                style={{shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
                    shadowRadius: 10, elevation: 8,}}>

                <Text className="font-jakarta-medium text-[14px]">
                        {personName}
                    </Text>

                <View className="flex-row justify-between items-center">
                    <Text className="font-jakarta-medium text-[14px]">
                        {name}
                    </Text>

                    <View className="flex-row items-center gap-2 rounded-[12px] bg-[#8BC2401A] p-[8px]">
                    <Image className="w-[10px] h-[10px]" 
                        source={images.company} resizeMode="contain"/>
                    <Text className="font-jakarta-medium text-[10px]">
                        {type}
                    </Text>
                    </View>
                </View>     

                <View className="flex-row items-center gap-3 mt-3">
                    <Image className="w-[12.5px] h-[12.5px]" 
                        source={images.phoneIcon} resizeMode="contain"/>
                    <Text className="font-jakarta-medium text-[12px]">
                        {phone}
                    </Text>
                </View>

                <View className="flex-row items-center gap-3 mt-3">
                    <Image className="w-[13px] h-[13px]" 
                        source={images.atIcon} resizeMode="contain"/>
                    <Text className="font-jakarta-medium text-[12px]">
                        Kenneth.C@sample.com
                    </Text>
                </View>

                <View className="flex-row items-center gap-3 mt-3">
                    <Image className="w-[13px] h-[14px]" 
                        source={images.phone2Icon} resizeMode="contain"/>
                    <Text className="font-jakarta-medium text-[12px]">
                        0912311123111
                    </Text>
                </View>
            </View>
        </View>

        <View className="bg-white border-b border-[#EAEAEA] px-6" 
                style={{ zIndex: 10, elevation: 10 }}>
          <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false} >
            <View className="flex-row">

              <Pressable onPress={() => scrollToSection(generalRef, "general")}
                className="mr-6 pb-3">
                <Text
                  className={`text-[13px] ${
                    activeTab === "general"
                      ? "text-[#8BC240] border-b-2 border-[#8BC240]"
                      : "text-[#8A8A8A]"}`}>
                  Contact Details
                </Text>
              </Pressable>

              <Pressable onPress={() => scrollToSection(addressRef, "address")}
                className="mr-6 pb-3">
                <Text
                  className={`text-[13px] ${
                    activeTab === "address"
                      ? "text-[#8BC240] border-b-2 border-[#8BC240]"
                      : "text-[#8A8A8A]"}`}>
                  Address Information
                </Text>
              </Pressable>

              <Pressable onPress={() => scrollToSection(contactRef, "contact")}
                className="mr-6 pb-3">
                <Text
                  className={`text-[13px] ${
                    activeTab === "contact"
                      ? "text-[#8BC240] border-b-2 border-[#8BC240]"
                      : "text-[#8A8A8A]"}`}>
                  Other Information
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
 
        <View ref={generalRef} onLayout={(e) => {
            sectionPositions.current.general = e.nativeEvent.layout.y;}}
            className="mt-6 px-[24px]">

         <View className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-1"
            style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
            shadowRadius: 10, elevation: 4,}}>
            
            <Text className="font-jakarta-bold text-[16px] mb-4">
              Contact Details
            </Text>

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Name 
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    Lorem Ipsum
                </Text>
            </View>   
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Account Name 
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Role
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    No
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Email
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />
            
            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Mobile
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    091233111133
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Phone
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
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
            
            <Text className="font-jakarta-bold text-[16px] mb-4">
              Address Information
            </Text>

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Address 1
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    Lorem Ipsum
                </Text>
            </View>   
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Address 2
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    City
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    091233111133
                </Text> 
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    State
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />
            
            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Country
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
            <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

            <View className="flex-row justify-between">              
                <Text className="font-jakarta-medium text-[14px] mb-2">
                    Zip
                </Text>

                <Text className="font-jakarta text-[14px] mb-2">
                    Lorem Ipsum
                </Text>
            </View> 
          </View>
        </View>

        {/* CONTACT */}
        <View ref={contactRef}
            onLayout={(e) => {sectionPositions.current.contact = e.nativeEvent.layout.y;}}
            className="mt-4 px-[24px]">
           
           <View className="rounded-[16px] border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-1"
                style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
                shadowRadius: 10, elevation: 4,}}>
                
                <Text className="font-jakarta-bold text-[16px] mb-4">
                    Other Information
                </Text>

                <View className="flex-row justify-between">              
                    <Text className="font-jakarta-medium text-[14px] mb-2">
                        Date of Registration
                    </Text>

                    <Text className="font-jakarta text-[14px] mb-2">
                        Lorem Ipsum
                    </Text>
                </View>   
                <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

                <View className="flex-row justify-between">              
                    <Text className="font-jakarta-medium text-[14px] mb-2">
                        Updated Date
                    </Text>

                    <Text className="font-jakarta text-[14px] mb-2">
                        Lorem Ipsum
                    </Text>
                </View> 
                <View className="h-[1px] bg-[#EAEAEA] mb-[8px] mt-[3px]" />

                <View className="flex-row justify-between">              
                    <Text className="font-jakarta-medium text-[14px] mb-2">
                        Contact Owner
                    </Text>

                    <Text className="font-jakarta text-[14px] mb-2">
                        Lorem Ipsum
                    </Text>
                </View> 
            </View> 
        </View>
      </ScrollView>
    </View>
  );}