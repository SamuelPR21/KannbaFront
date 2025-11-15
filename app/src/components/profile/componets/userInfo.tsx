import React from "react";
import { Text, View } from "react-native";

type Props = {
    fullName: string;
    username: string;
    age: number;
}

export default function UserInfo({ fullName, username, age }: Props) {
    return(
        <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="bg-blue-100 rounded-full w-16 h-16 items-center justify-center mr-3">
            <Text className="text-2xl font-bold text-blue-800">
              {fullName.split(" ").map(n=>n[0]).slice(0,2).join("")}
            </Text>
          </View>
  
          <View>
            <Text className="text-lg font-semibold text-black">{fullName}</Text>
            <Text className="text-sm text-gray-600">@{username}</Text>
            <Text className="text-sm text-gray-600">{age} años</Text>
          </View>
        </View>
      </View>
    )
}

