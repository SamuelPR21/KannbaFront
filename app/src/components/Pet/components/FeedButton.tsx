import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  disabled?: boolean;
  onPress: () => void;
  children?: React.ReactNode;
}

const FeedButton: React.FC<Props> = ({ disabled, onPress, children }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    className={`px-6 py-3 rounded-2xl ${
      disabled ? 'bg-blue-300' : 'bg-blue-500'
    } shadow-md`}
    style={{ elevation: disabled ? 0 : 4 }}
  >
    <Text
      className={`text-center font-semibold ${
        disabled ? 'text-blue-900/60' : 'text-white'
      }`}
    >
      {children || 'Alimentar'}
    </Text>
  </TouchableOpacity>
);

export default FeedButton;
