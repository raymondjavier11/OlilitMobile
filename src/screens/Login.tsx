import React,{useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {View,Text,Image,TextInput,Pressable,SafeAreaView,KeyboardAvoidingView,Platform,ActivityIndicator,
} from "react-native";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{email?: string; password?: string; submit?: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};

 

    if (!email.trim()){ 
      newErrors.email = "Email is required!";
    }
     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Please enter a valid email";
    } 

    if (!password.trim()){
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

 const handleLogin = async () => {
  if(!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    console.log("login successful with:", { email, password });
    // TODO: Navigate to home screen here
    // navigation.navigate("Home");
 } catch (error: any) {
    setErrors({ submit: (error as Error).message || "Login failed."});
  } finally {
    setIsLoading(false);
  }
};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}>

        <View className="flex-1 justify-between px-6 mt-10">

          <View className="items-center pt-6">

            <Image
              source={require("../../Assets/Images/olilitLogo.png")}
              className="w-[60%] max-w-[215px] h-[51px] mb-10"
              resizeMode="contain"/>

            <View className="w-full max-w-[342px] gap-5">

              <View className="items-center">
                <Text className="font-jakarta-semibold text-[20px] mb-6 text-center">
                  Login to Olilit Funding
                </Text>
              </View>

              <View>
                <Text className="font-jakarta-medium mb-2">
                  Email
                </Text>

                <TextInput
                  placeholder="Enter email"
                  value = {email}
                  onChangeText={setEmail}
                  className="bg-gray-200 border border-gray-300 h-[60px] rounded-2xl px-4 w-full"/>
                {errors.email && (
                  <Text className="text-red-600 text-[12px] mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>

             <View>
  <Text className="font-jakarta-medium mb-2">
    Password
  </Text>

  <View className="bg-gray-200 border border-gray-300 h-[60px] rounded-2xl px-4 w-full flex-row items-center">
    <TextInput
      placeholder="Enter password"
      secureTextEntry={!showPassword}
      value={password}
      onChangeText={setPassword}
      className="flex-1"
    />
    <Pressable onPress={() => setShowPassword(!showPassword)}>
      <Ionicons
        name={showPassword ? "eye-off" : "eye"}
        size={20}
        color="gray"
      />
    </Pressable>
  </View>

  {errors.password && (
    <Text className="text-red-600 text-[12px] mt-1">
      {errors.password}
    </Text>
  )}
</View>

              <View className="items-end">
                <Text className="font-jakarta-medium text-[#638A2D]">
                  Forgot Password?
                </Text>
              </View>

              <Pressable className="w-full h-[52px] bg-[#8BC240] rounded-2xl justify-center items-center"
              onPress={handleLogin}
              disabled = {isLoading}>
               {isLoading ? (
  <ActivityIndicator color="white" size="small" />
) : (
  <Text className="text-white text-[16px] font-jakarta-semibold">
    Login
  </Text>
)}
              </Pressable>

            </View>
          </View>

          <View className="items-center pb-8">
            <Text className="text-[#232B39] text-[10px] mb-1">
              Powered by:
            </Text>

            <Image
              source={require("../../Assets/Images/legalsynq.png")}
              className="w-[40%] max-w-[120px] h-[30px] mb-3"
              resizeMode="contain"/>

            <Text className="text-[#232B39] text-[10px] text-center">
              Terms & Conditions | Privacy Policy
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}