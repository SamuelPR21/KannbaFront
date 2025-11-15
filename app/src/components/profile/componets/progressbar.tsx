import React from 'react';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  progress: number; 
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const safe = Math.max(0, Math.min(100, Math.round(progress)));
  const width = safe;

  return (
    <View className="mb-4">
      <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <View style={{ width: `${width}%` }} className="h-3 bg-gradient-to-r from-cyan-500 to-blue-800" />
      </View>
      <Text className="text-center text-sm text-blue-700 mt-1">{safe}%</Text>
    </View>
  );
}