import React, { useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constant/images";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ApplyNewPassword() {
  const navigation = useNavigation<any>();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔥 VALIDATIONS
  const validations = {
    length: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    symbol: /[^A-Za-z0-9]/.test(newPassword),
    match: newPassword === confirmPassword && confirmPassword.length > 0,
  };

  const allValid =
    validations.length &&
    validations.upper &&
    validations.lower &&
    validations.number &&
    validations.symbol &&
    validations.match;

  const renderRule = (label: string, valid: boolean) => (
    <View className="flex-row items-center mb-2">
      <Ionicons
        name={valid ? "checkmark-circle" : "close-circle"}
        size={18}
        color={valid ? "#4CAF50" : "#E53935"}
        style={{ marginRight: 8 }}
      />
      <Text
        className={`text-[13px] ${
          valid ? "text-green-600" : "text-red-500"
        }`}>
        {label}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5] px-5 justify-between">
      <View>
        {/* HEADER */}
        <View className="flex-row items-center mt-3 mb-8">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-[44px] h-[44px] rounded-full bg-[#f3f2f2] justify-center items-center">
            <Image
              source={images.leftArrow}
              className="w-[6px] h-[12px]"
              resizeMode="contain"
            />
          </Pressable>

          <Text className="flex-1 text-center text-[16px] font-jakarta-bold">
            Change Password
          </Text>

          <View className="w-[44px]" />
        </View>

        {/* TEXT */}
        <Text className="font-jakarta-medium text-[16px] mb-5">
          For security, enter your new password
        </Text>

        {/* NEW PASSWORD */}
        <View className="mb-4">
          <Text className="font-jakarta-medium text-[14px] mb-2">
            New Password
          </Text>

          <View className="bg-gray-200 h-[60px] rounded-2xl px-4 flex-row items-center">
            <TextInput
              placeholder="Enter new password"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
              className="flex-1"
            />

            <Pressable onPress={() => setShowNew(!showNew)}>
              <Ionicons
                name={showNew ? "eye-off" : "eye"}
                size={20}
                color="gray"
              />
            </Pressable>
          </View>
        </View>

        {/* CONFIRM PASSWORD */}
        <View className="mb-5">
          <Text className="font-jakarta-medium text-[14px] mb-2">
            Confirm Password
          </Text>

          <View className="bg-gray-200 h-[60px] rounded-2xl px-4 flex-row items-center">
            <TextInput
              placeholder="Confirm password"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="flex-1"
            />

            <Pressable onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons
                name={showConfirm ? "eye-off" : "eye"}
                size={20}
                color="gray"
              />
            </Pressable>
          </View>
        </View>

        {/* VALIDATION LIST */}
        <View>
          {renderRule("Password must be atleast 8 characters", validations.length)}
          {renderRule("Password must contain atleast 1 uppercase letter", validations.upper)}
          {renderRule("Password must contain atleast 1 lowercase letter", validations.lower)}
          {renderRule("Password must contain atleast 1 number", validations.number)}
          {renderRule("Password must contain atleast 1 symbol", validations.symbol)}
          {renderRule("New and confirm password must match", validations.match)}
        </View>
      </View>

      {/* SAVE BUTTON */}
      <Pressable
        disabled={!allValid}
        onPress={() => console.log("Password Saved")}
        className={`py-4 rounded-[20px] items-center mb-5 ${
          allValid ? "bg-[#8BC240]" : "bg-gray-400"
        }`}>
        <Text className="text-white text-[16px] font-jakarta-bold">
          Save
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}