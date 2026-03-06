import React, { useEffect } from "react";
import { View, Image } from "react-native";
import images from "../../constant/images";

const SplashScreen = ({ navigation }: any) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
          <Image
      source={images.logo}
      className="w-45 h-40"
      resizeMode="contain"
    />
    </View> 
    
  );
};

export default SplashScreen;