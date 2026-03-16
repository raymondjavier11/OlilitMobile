import { View, Text, Image, Pressable, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import images from "../../constant/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Modal } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Provider as PaperProvider } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { Animated } from "react-native";


type RootStackParamList = {
  ContactsDetails: {
    name: string;
    phone: string;
    address: string;
    type: string;
    personName: string
  };
};
const calendarTheme = {
  colors: {
    primary: "#8BC240",        
    onPrimary: "#ffffff",
    background: "#ffffff",
    surface: "#ffffff",  
    text: "#1f2937",
    placeholder: "#9CA3AF",
  },
};


export default function Contacts() {

  const [showFilter, setShowFilter] = useState(false);
  const [contactSort, setContactSort] = useState<"asc" | "desc" | null>(null);
  const [accountSort, setAccountSort] = useState<"asc" | "desc" | null>(null);
  const [phoneSort, setPhoneSort] = useState<"asc" | "desc" | null>(null);
  const [companyType, setCompanyType] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const slideAnim = useState(new Animated.Value(-100))[0];

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const resetFilter = () => {
  setCompanyType(null);
  };

  const showFilterBanner = () => {

  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }).start();

  setTimeout(() => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, 3000);
};
  
  const getMarkedDates = () => {
  if (!range.startDate) return {};

  const start = range.startDate.toISOString().split("T")[0];
  const end = range.endDate
    ? range.endDate.toISOString().split("T")[0]
    : null;

  let marked: any = {};

  if (start && !end) {
    marked[start] = {
      startingDay: true,
      endingDay: true,
      color: "#8BC240",
      textColor: "white",
    };
    return marked;
  }

  let current = new Date(range.startDate);
  let last = new Date(range.endDate!);

  while (current <= last) {
    const dateString = current.toISOString().split("T")[0];

    if (dateString === start) {
      marked[dateString] = {
        startingDay: true,
        color: "#8BC240",
        textColor: "white",
      };
    } else if (dateString === end) {
      marked[dateString] = {
        endingDay: true,
        color: "#8BC240",
        textColor: "white",
      };
    } else {
      marked[dateString] = {
        color: "#EAF5D9",
        textColor: "#000",
      };
    }

    current.setDate(current.getDate() + 1);
  }

  return marked;
  };

  const [openCalendar, setOpenCalendar] = useState(false);

  const [range, setRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });
    const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US");
  };

    const companyTypes = [
    { label: "Attorney", value: "Attorney" },
    { label: "Injured Party", value: "Injured Party" },
    { label: "Reductions", value: "Reductions" },
    { label: "Insurances Co", value: "Insurances Co" },
    { label: "Marketer", value: "Marketer" },
    { label: "Paralegal", value: "Paralegal" },
    { label: "Judge", value: "Judge" },
    { label: "Negotiator", value: "Negotiator" },
  ];

  const companies = [
    {
      id: 1,
      personName: "Choi, Kenneth",
      name: "ABCDE Company",
      type: "Injured Party",
      phone: "61239001123",
      address: "3578 Hiney Road, Nevada, Las Vegas",
      date: "December 20, 2025. 03:31:11 PM",
    },
    {
      id: 2,
      personName: "Raymond",
      name: "Global Tech Ltd.",
      type: "Injured Party",
      phone: "98765432100",
      address: "245 Sunset Blvd, California, Los Angeles",
      date: "January 12, 2026. 10:20:45 AM",
    },
    {
      id: 3,
      personName: "Javier",
      name: "Prime Holdings",
      type: "Neurology",
      phone: "44556677889",
      address: "120 King Street, New York, Manhattan",
      date: "February 05, 2026. 08:15:30 PM",
    },
    {
      id: 4,
      personName: "Agapay",
      name: "Funding Experts",
      type: "Injured Party",
      phone: "33445566778",
      address: "55 Wall Street, New York, Manhattan",
      date: "March 01, 2026. 09:45:00 AM",
    },
    {
      id: 5,
      personName: "Israel",
      name: "ABCD Company",
      type: "Law Firm",
      phone: "33445566778",
      address: "55 Wall Street, New York, Manhattan",
      date: "March 01, 2026. 09:45:00 AM",
    },
    
  ];

  const [filteredCompanies, setFilteredCompanies] = useState(companies);

    const applyFilter = () => {
    if (!companyType) return; 

    const sorted = [...companies].sort((a, b) => {
      if (a.type === companyType && b.type !== companyType) return -1;
      if (a.type !== companyType && b.type === companyType) return 1;
      return 0;
    });

    const filtered = sorted.filter((company) =>
     company.name.toLowerCase().includes(searchText.toLowerCase()) ||
     company.personName.toLowerCase().includes(searchText.toLowerCase())
    );

        setFilteredCompanies(filtered);
      };

      const handleSearch = (text: string) => {
      setSearchText(text);

      const searched = companies.filter((company) =>
        company.name.toLowerCase().includes(text.toLowerCase()) ||
        company.personName.toLowerCase().includes(text.toLowerCase())
      );

      if (companyType) {
        searched.sort((a, b) => {
          if (a.type === companyType && b.type !== companyType) return -1;
          if (a.type !== companyType && b.type === companyType) return 1;
          return 0;
        });
      }

      setFilteredCompanies(searched);
    };
      
    const applySortAndFilter = () => {

    let updated = [...companies];

      if (contactSort === "asc") {
      updated.sort((a,b)=>a.personName.localeCompare(b.personName));
      }

      if (contactSort === "desc") {
      updated.sort((a,b)=>b.personName.localeCompare(a.personName));
      }

      if (accountSort === "asc") {
      updated.sort((a,b)=>a.name.localeCompare(b.name));
      }

      if (accountSort === "desc") {
      updated.sort((a,b)=>b.name.localeCompare(a.name));
      }

      if (phoneSort === "asc") {
      updated.sort((a,b)=>a.phone.localeCompare(b.phone));
      }

      if (phoneSort === "desc") {
      updated.sort((a,b)=>b.phone.localeCompare(a.phone));
      }

      if (companyType) {
      updated = updated.filter(
      (c)=>c.type === companyType
      );
      }

    setFilteredCompanies(updated);
    };

  return (
    <PaperProvider theme={calendarTheme}>
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-[24px]">

        <View className="flex-row items-center mt-12 mb-[20px]">

          <Pressable
            onPress={() => navigation.goBack()}
            className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
            <Image
              source={images.leftArrow}
              className="w-[6px] h-[12px]" />
          </Pressable>

          <View className="flex-1 items-center">
            <Text className="text-[16px] font-jakarta-bold">
              Contacts
            </Text>
          </View>

          <View className="w-[44px]" />

        </View>

        <View className="flex-row justify-between gap-3">

          <View className="flex-1 h-[60px] bg-[#eeecec] rounded-[16px] flex-row items-center px-4 gap-2">
            <TextInput
              placeholder="Search Company"
              className="flex-1 text-base"
              value={searchText}
              onChangeText={handleSearch} />
          </View>

          <Pressable
            onPress={() => setShowFilter(true)}
            className="w-[60px] h-[60px] rounded-[54px] bg-[#eeeded] items-center justify-center">
            <Image
              source={images.filterIcon}
              className="w-[20px] h-[20px]" />
          </Pressable>

        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {filteredCompanies.length === 0 ? (
            <Text className="text-center text-gray-400 mt-10">
              No company found
            </Text>
          ) : (
            filteredCompanies.map((company) => (
              <View
                key={company.id}
                className="rounded-[16px] border border-[#F4F4F4] px-[20px] py-[16px] bg-[#FFFFFF] mt-5"
                style={{ shadowColor: "#888",shadowOffset: { width: 0, height: 10 },shadowOpacity: 0.05,
                  shadowRadius: 10, elevation: 4, }} >

                <Text className="font-jakarta-bold text-[14px]">{company.personName}</Text>

                <View className="flex-row justify-between items-center">   
                  <Text className="font-jakarta-medium text-[12px]">
                    {company.name}
                  </Text>

                  <View className="flex-row items-center gap-2 rounded-[12px] bg-[#8BC2401A] p-[8px]">
                    <Image
                      className="w-[10px] h-[10px]"
                      source={images.gearPersonIcon} />
                    <Text className="font-jakarta-medium text-[10px]">
                      {company.type}
                    </Text>
                  </View>
                </View> 

                <View className="flex-row items-center gap-3 mt-3">
                  <Image
                    className="w-[12px] h-[12px]"
                    source={images.phoneIcon} 
                    resizeMode="contain"/>
                  <Text className="font-jakarta-medium text-[12px]">
                    {company.phone}
                  </Text>
                </View>

                <View className="flex-row items-center gap-3 mt-3">
                  <Image
                    className="w-[12px] h-[13px]"
                    source={images.calendarIcon} 
                    resizeMode="contain"/>
                  <Text className="font-jakarta-medium text-[12px]">
                    {company.date}
                  </Text>
                </View>

                <Pressable
                  onPress={() =>
                    navigation.navigate("ContactsDetails", {
                      name: company.name,
                      phone: company.phone,
                      address: company.address,
                      type: company.type,
                      personName: company.personName
                    })
                  }
                  className="rounded-[16px] bg-[#FFFFFF] border border-[#8BC240] px-[20px] py-[16px] items-center mt-6">
                  <View className="flex-row items-center">
                    <Text className="text-[#8BC240] font-jakarta-medium">
                      View Details
                    </Text>

                    <Image
                      source={images.arrowButton}
                      resizeMode="contain"
                      className="w-[15px] h-[15px] ml-[8px] mt-[2px]"
                    />
                  </View>
                </Pressable>

              </View>
            )))}      
        </ScrollView>
      </View>

      <Modal visible={showFilter} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black/40">

          <View className="bg-white rounded-t-[30px] p-6">

          <View className="items-center mb-4">
          <View className="w-[40px] h-[5px] bg-gray-300 rounded-full"/>
          </View>

          <View className="flex-row justify-between items-center">
          <Text className="text-[20px] font-jakarta-bold">Sort & Filter</Text>

          <Pressable onPress={resetFilter}>
          <Text className="text-[#8BC240]">Reset Filter</Text>
          </Pressable>
          </View>

          <Text className="font-jakarta-medium mt-2 text-[15px]">Sort</Text>

          <Text className="font-jakarta-medium mt-4 text-[14px]">Contact Name</Text>

          <View className="flex-row gap-3 mt-2">

            <Pressable onPress={() => setContactSort("asc")}
              className={`font-jakarta-medium flex-1 py-3 rounded-[12px] items-center ${
                contactSort === "asc" ? "bg-[#8BC240]" : "bg-[#eeeeee]" }`}>

              <Text className= {contactSort === "asc" ? "text-white" : "text-gray-500"}>
                Ascending
              </Text>
            </Pressable>

            <Pressable onPress={() => setContactSort("desc")}
              className={`font-jakarta-medium flex-1 py-3 rounded-[12px] items-center ${
                contactSort === "desc" ? "bg-[#8BC240]" : "bg-[#eeeeee]"}`}>

              <Text className={contactSort === "desc" ? "text-white" : "text-gray-500"}>
                Descending
              </Text>
            </Pressable>

          </View>

          <Text className="font-jakarta-medium mt-4 text-[14px]">Account Name</Text>

          <View className="flex-row gap-3 mt-2">

            <Pressable onPress={() => setAccountSort("asc")}
              className={`font-jakarta-medium flex-1 py-3 rounded-[12px] items-center ${
                accountSort === "asc" ? "bg-[#8BC240]" : "bg-[#eeeeee]"}`}>

              <Text className={accountSort === "asc" ? "text-white" : "text-gray-500"}>
                Ascending
              </Text>
            </Pressable>

            <Pressable onPress={() => setAccountSort("desc")}
                className={`font-jakarta-medium flex-1 py-3 rounded-[12px] items-center ${
                  accountSort === "desc" ? "bg-[#8BC240]" : "bg-[#eeeeee]" }`}>

              <Text className={accountSort === "desc" ? "text-white" : "text-gray-500"}>
                Descending
              </Text>
            </Pressable>               
          </View>

          <Text className="font-jakarta-medium mt-4 text-[14px]">Phone</Text>

          <View className="flex-row gap-3 mt-2">

            <Pressable onPress={() => setPhoneSort("asc")}
              className={`font-jakarta-medium flex-1 py-3 rounded-[12px] items-center ${
                phoneSort === "asc" ? "bg-[#8BC240]" : "bg-[#eeeeee]"}`}>

              <Text className={phoneSort === "asc" ? "text-white" : "text-gray-500"}>
                Ascending
              </Text>
            </Pressable>

            <Pressable onPress={() => setPhoneSort("desc")}
              className={`font-jakarta-medium flex-1 py-3 rounded-[12px] items-center ${
                phoneSort === "desc" ? "bg-[#8BC240]" : "bg-[#eeeeee]"}`}>
              <Text className={phoneSort === "desc" ? "text-white" : "text-gray-500"}>
                Descending
              </Text>
            </Pressable>

          </View>

          <Text className="mt-6 text-[16px] font-jakarta-semibold">Filter</Text>

          <Text className="mt-3 font-jakarta-medium text-[14px]">Role</Text>

          <Dropdown style={{ height:50, borderRadius:12,paddingHorizontal:12, marginTop:8, backgroundColor:"#eeeeee" }}
            data={companyTypes}
            labelField="label"
            valueField="value"
            placeholder="Company Type"
            value={companyType}
            onChange={(item)=>setCompanyType(item.value)}/>

            <Text className="mt-4 font-jakarta-medium text-[14px]">
              Modified Time
            </Text>

            <Pressable
              onPress={() => setOpenCalendar(true)}
              className="flex-row items-center justify-between bg-[#eeeeee] rounded-[12px] py-3 px-4 mt-2">

              <Text className="text-gray-400">
                {range.startDate && range.endDate
                  ? `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`
                  : "DD/MM/YYYY - DD/MM/YYYY"}
              </Text>

              <Image
                source={images.calendar2Icon}
                resizeMode="contain"
                className="w-[18px] h-[18px]"/>

            </Pressable>   


          <Pressable onPress={()=>{
            applySortAndFilter()
            setShowFilter(false)
            showFilterBanner()
          }}
          className="bg-[#8BC240] py-4 rounded-[16px] items-center mt-6">

          <Text className="text-white font-jakarta-medium">Save</Text>
          </Pressable>

          <Pressable onPress={()=>setShowFilter(false)}
          className="bg-gray-400 py-4 rounded-[16px] items-center mt-3">

          <Text className="text-white font-jakarta-medium">Cancel</Text>
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

                  if (!range.startDate || (range.startDate && range.endDate)) {
                    setRange({
                      startDate: selected,
                      endDate: undefined,
                    });
                  } else {
                    if (selected >= range.startDate) {
                      setRange({
                        startDate: range.startDate,
                        endDate: selected,
                      });
                    } else {
                      setRange({
                        startDate: selected,
                        endDate: range.startDate,
                      });
                    }
                  }
                }}

                markedDates={getMarkedDates()}

                theme={{ todayTextColor: "#8BC240", arrowColor: "#8BC240", }}

                renderArrow={(direction) => (
                  <Text style={{ fontSize: 18, color: "#8BC240" }}>
                    {direction === "left" ? "‹" : "›"}
                  </Text>)}

                enableSwipeMonths={true}/>

              <View className="flex-row justify-between mt-6">

                <Pressable
                  onPress={() => setOpenCalendar(false)}
                  className="flex-1 bg-gray-300 py-3 rounded-[12px] items-center mr-2" >
                <Text className="text-white">Cancel</Text>
                </Pressable>

                <Pressable onPress={() => setOpenCalendar(false)}
                  className="flex-1 bg-[#8BC240] py-3 rounded-[12px] items-center ml-2">

                  <Text className="text-white">Done</Text>
                </Pressable> 

              </View>

            </View>
          </View>
        </Modal>

        <Animated.View
            style={{ position: "absolute", top: 30, left: 20, right: 20, transform: [{ translateY: slideAnim }],
            backgroundColor: "#6AA56A", paddingVertical: 20, paddingHorizontal: 20, borderRadius: 16,
            zIndex: 999, flexDirection: "row", justifyContent: "space-between", alignItems: "center",}}>

          <Text style={{ color: "white", fontWeight: "600" }}>
            Filters applied
          </Text>

          <Pressable
            onPress={() => Animated.timing(slideAnim, {
                toValue: -100, duration: 300, useNativeDriver: true,
              }).start()}>

            <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
          </Pressable>

        </Animated.View>

      </SafeAreaView>
    </PaperProvider>
  );
}