import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PetState } from '../types';

const states: PetState[] = ['HAPPY', 'HUNGRY', 'DEAD'];

const StateToggleDebug: React.FC<{ onSet: (s: PetState) => void }> = ({ onSet }) => (
  <View className="flex-row gap-2 my-4">
    {states.map(s => (
      <TouchableOpacity
        key={s}
        onPress={() => onSet(s)}
        className="px-3 py-2 rounded-lg bg-blue-600"
      >
        <Text className="text-white font-semibold">{s}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default StateToggleDebug;
