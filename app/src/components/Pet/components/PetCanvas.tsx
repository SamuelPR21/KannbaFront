import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Dimensions, View } from "react-native";
import { PetState } from "../types";

const { width } = Dimensions.get("window");

const animation = {
  HAPPY: require("../assents/happy.json"),
  HUNGRY: require("../assents/hungry.json"),
  DEAD: require("../assents/dead.json"),
};

const PetCanvas: React.FC<{ state: PetState }> = ({ state }) => {
  const ref = useRef<LottieView | null>(null);

  useEffect(() => {
    ref.current?.reset();
    ref.current?.play();
  }, [state]);

  return (
    <LinearGradient
      colors={["#1E3A8A", "#3B82F6"]}
      style={{
        width,
        height: 320,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 260,
          height: 260,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          ref={ref}
          source={animation[state]}
          autoPlay
          loop
          style={{ width: 240, height: 240 }}
        />
      </View>
    </LinearGradient>
  );
};

export default PetCanvas;
