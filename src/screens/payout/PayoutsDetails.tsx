import { View, Text, Image, Pressable, TextInput } from "react-native";
import React from "react";
import images from "../../constant/images";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import { Modal } from "react-native";
import { useState } from "react";

type RootStackParamList = {
  PayoutsDetails: {
    name: string;
    id: string;
    type: string; 
    status: string;
    value: string;
    date: string;
  };
  ApproveComplete: {
  id: string;
  name: string;
  date: string;
  transactionId: string;
};
RejectComplete: {
  id: string;
  name: string;
  date: string;
  transactionId: string;
};
};

type RouteProps = RouteProp<RootStackParamList, "PayoutsDetails">;

type NavigationProp = NativeStackNavigationProp<RootStackParamList,"PayoutsDetails">;

export default function PayoutsDetails() {

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showApproveModals, setShowApproveModals] = useState(false);

  const transactionLogMock = [
  {
    label: "Date/Time",
    value: "2025-05-19 03:31:11 PM",
  },
  {
    label: "Status",
    value: "status", 
  },
  {
    label: "Card",
    value: "Visa - 0006",
  },
  {
    label: "Issued",
    value: "INTL HDQTRS-CENTER OWNED",
  },
  {
    label: "Transaction ID",
    value: "305135699059766",
  },
];

  const payoutDetailsMock = [
  {
    label: "Payout Title",
    value: "51935 - Choi, Kenneth - pre-settlement funding",
  },
  {
    label: "# of Recipients",
    value: "1",
  },
  {
    label: "Total Payouts $",
    value: "$40,000.00",
  },
  {
    label: "Contract ID",
    value: "51935",
  },
  {
    label: "Funded Amount",
    value: "-------",
  },
  {
    label: "IP Name",
    value: "Albert Flores",
  },
  {
    label: "Lawyer Name",
    value: "Esther Howard",
  },
  {
    label: "Lawyer Phone No.",
    value: "(234)123-4114",
  },
  {
    label: "Lawfirm Name",
    value: "Mountain West Lawyers",
  },
  {
    label: "Lawfirm Phone No.",
    value: "(234)123-4114",
  },
  {
    label: "Case Manager Name",
    value: "Theresa Webb",
  },
  {
    label: "Advance Amount",
    value: "$40,000.00",
  },
  {
    label: "Doc Fee",
    value: "$40,000.00",
  }, 
  {
    label: "Status",
    value: "$40,000.00",
  },
];

  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();

  const { name, id, type, status, value, date } = route.params;

  const getStatusColor = () => {
    if (status === "Rejected") return "#E14D4D";
    if (status === "Pending") return "#898989";
    if (status === "Issued") return "#8BC240";
  };

  return (
    <View className="flex-1 px-[25px]">
      
      <View className="flex-row items-center mt-12">

        <Pressable
          onPress={() => navigation.goBack()}
          className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
          <Image
            source={images.leftArrow}
            className="w-[6px] h-[12px]"/>
        </Pressable>

        <View className="flex-1 items-center">
          <Text className="text-[16px] font-jakarta-bold">
            Payouts Details
          </Text>
        </View>

        <View className="w-[44px]" />

      </View>

  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 120 }}>
      
      <View
        className="bg-white rounded-[16px] border border-[#F4F4F4] px-[20px] py-[16px] mt-[16px]"
        style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
          shadowRadius: 10, elevation: 4,}}> 
          
        <View className="flex-row justify-between items-center pb-[16px]">
                <Text className="text-[16px] font-jakarta-bold">Payout Recipient(s)</Text>
            <View
                style={{ backgroundColor: getStatusColor() }}
                className="w-[86px] h-[26px] rounded-[21px] items-center justify-center ">
                <Text className="text-white text-[12px] font-semibold">
                    {status}
                </Text>
            </View>
        </View>

        <View className="flex-row justify-between ">
         <Text className="font-jakarta-semibold text-[14px]">{name}</Text>
          <Text className="text-[14px] font-jakarta-semibold">{value}</Text>
        </View>

        <View className="flex-row justify-between pb-[12px]">
          <Text className="font-jakarta text-[12px]">sample@email.com</Text>
          <Text className="font-jakarta text-[12px]">Claim Created</Text>
        </View>                       

          <Text className="font-jakarta-medium text-[14px] pb-[5px]">Phone Number</Text>

        <View className=" h-[60px] bg-[#eeecec] rounded-[16px] flex-row items-center px-4 gap-2">
            <TextInput placeholder="(252)123 - 1231"
                className="flex-1 text-[16px] font-jakarta-bold text-[#121112]"/>
            <Image className="w-5 h-5"/>
        </View>
      </View>

      <View
          className="bg-white rounded-[16px] border border-[#F4F4F4] px-[20px] py-[16px] mt-[16px]"
          style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4,}}>
          
          <Text className="font-jakarta-bold text-[16px] mb-[6px]">
            Transaction Log
          </Text>

          {transactionLogMock.map((item, index) => (
            <View key={index}
              className={`flex-row justify-between py-[12px] ${index !== transactionLogMock.length - 1 ? "border-b border-[#C8C8C8]" : ""}`}>
              
              <Text className="text-[14px] font-jakarta-medium">
                {item.label}
              </Text>

              {item.label === "Status" ? (
                <View
                  style={{ backgroundColor: getStatusColor() }}
                  className="w-[86px] h-[26px] rounded-[21px] items-center justify-center">
                  <Text className="text-white text-[12px] font-semibold">
                    {status}
                  </Text>
                </View>
              ) : (
                <Text className="font-jakarta-medium text-[14px] max-w-[200px] text-right">
                  {item.value}
                </Text>
              )}
            </View>
          ))}
        </View>

      <View className="bg-white rounded-[16px] border border-[#F4F4F4] px-[20px] py-[16px] mt-[16px]"
        style={{ shadowColor: "#888", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05,
          shadowRadius: 10, elevation: 4,}}>

             <Text className="font-jakarta-bold text-[16px] text-[#121112]">Payout Details</Text>

        <View className="bg-white rounded-[16px]  border-[#F4F4F4]  mt-[16px]">

          {payoutDetailsMock.map((item, index) => (
            
            <View
              key={index}
              className="flex-row justify-between py-[12px] border-b border-[#E5E5E5]">
              <Text className="text-[14px] text-[#444]">
                {item.label}
              </Text>
              <Text className="text-[14px] text-[#444] text-right max-w-[200px]">
                {item.value}
              </Text>
            </View>))}

        </View>
      </View>
  </ScrollView>

       <View className="absolute bottom-0 left-0 right-0 px-[25px] pt-[12px] pb-[30px] bg-white border-t border-[#F0F0F0] flex-row gap-[12px]">
      
          <Pressable onPress={() => setShowApproveModals(true)}
          className="flex-1 h-[56px] rounded-[16px] border bg-[#999899] border-[#999899] items-center justify-center">
              <Text className="text-[#FFFFFF] font-jakarta-semibold text-[16px]">
                Reject
              </Text>
          </Pressable>
      
          <Pressable onPress={() => setShowApproveModal(true)}
          className="flex-1 h-[56px] rounded-[16px] bg-[#8BC240] items-center justify-center">
              <Text className="text-white font-jakarta-semibold text-[16px]">
                Approve
              </Text>
          </Pressable>

       </View>

       <Modal visible={showApproveModal} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/40">

            <View className="bg-white rounded-t-[24px] px-[25px] pt-[20px] pb-[30px]">

              <View className="w-[40px] h-[4px] bg-[#D9D9D9] rounded-full self-center mb-[20px]" />

              <Text className="text-[20px] font-jakarta-bold mb-[10px]">
                Approve this Payout?
              </Text>

              <Text className="text-[14px] text-[#666] mb-[24px]">
                Are you sure you want to approve payout {id} - {name} | {type} | Amount: {value}
              </Text>

              <Pressable onPress={() => navigation.navigate("ApproveComplete", {id: id,name: name, date: date,transactionId: "305135699059766",})}
                className="h-[56px] rounded-[16px] bg-[#8BC240] items-center justify-center mb-[10px]">
                <Text className="text-white text-[16px] font-jakarta-semibold">
                  Approve
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setShowApproveModal(false)}
                className="h-[56px] rounded-[16px] bg-[#999899] items-center justify-center">
                <Text className="text-white text-[16px] font-jakarta-semibold">
                  Cancel
                </Text>
              </Pressable>

            </View>

          </View>

        </Modal>

        <Modal visible={showApproveModals} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/40">

            <View className="bg-white rounded-t-[24px] px-[25px] pt-[20px] pb-[30px]">

              <View className="w-[40px] h-[4px] bg-[#D9D9D9] rounded-full self-center mb-[20px]" />

              <Text className="text-[20px] font-jakarta-bold mb-[10px]">
                Reject this Payout?
              </Text>

              <Text className="text-[14px] text-[#666] mb-[24px]">
                Are you sure you want to reject payout {id} - {name} | {type} | Amount: {value}?
              </Text>

              <Pressable
                onPress={() =>
                  navigation.navigate("RejectComplete", {id: id, name: name,date: date,transactionId: "305135699059766",})}
                className="h-[56px] rounded-[16px] bg-[#E14D4D] items-center justify-center mb-[10px]">
                <Text className="text-white text-[16px] font-jakarta-semibold">
                  Reject
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setShowApproveModals(false)}
                className="h-[56px] rounded-[16px] bg-[#999899] items-center justify-center">
                <Text className="text-white text-[16px] font-jakarta-semibold">
                  Cancel
                </Text>
              </Pressable>

            </View>

          </View>

        </Modal>

    </View>
  );
}