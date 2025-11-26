import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { PetState } from "../types";

const animation = {
  HAPPY: require("../assents/happy.json"),
  HUNGRY: require("../assents/hungry.json"),
  DEAD: require("../assents/dead.json"),
};

const PetCanvas: React.FC<{ state: PetState }> = ({ state }) => {
  const ref = useRef<LottieView | null>(null);

  useEffect(() => {
    // restart animation when state changes
    ref.current?.reset?.();
    ref.current?.play?.();
  }, [state]);

  // badge color by state
  const badgeColor = state === 'HAPPY' ? 'bg-green-500' : state === 'HUNGRY' ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <LinearGradient
      colors={["#0f172a", "#1f2937", "#3b82f6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="w-full h-80 flex items-center justify-center p-4 rounded-2xl"
    >
      <View className="w-80 h-80 bg-white/6 rounded-3xl shadow-2xl flex items-center justify-center border border-white/10 overflow-hidden relative">
        {/* Soft glow */}
        <View style={{ position: 'absolute', width: 320, height: 320, borderRadius: 160, backgroundColor: 'rgba(255,255,255,0.03)' }} />

        <View className="absolute top-4 left-4 flex-row items-center px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
          <View className={`${badgeColor} w-3 h-3 rounded-full mr-2`} />
          <Text className="text-white font-semibold text-sm">{state}</Text>
        </View>

        <LottieView
          ref={ref}
          source={animation[state]}
          autoPlay
          loop
          style={{ width: 260, height: 260 }}
        />
      </View>
    </LinearGradient>
  );
};

export default PetCanvas;
