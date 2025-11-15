import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../../../navigation/types";

export default function BottomBackProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goToProfile = () => navigation.navigate("Tab");

  return (
    <View
      className="absolute bottom-6 left-6"
      style={{
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }}
    >
      <TouchableOpacity
        onPress={goToProfile}
        activeOpacity={0.8}
        className="bg-blue-700 rounded-full p-4 items-center justify-center"
      >
        <ArrowLeft color="white" size={26} />
      </TouchableOpacity>
    </View>
  );
}
