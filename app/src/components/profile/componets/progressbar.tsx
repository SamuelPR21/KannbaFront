import React, { useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, Text, TouchableOpacity, View } from "react-native";
import { getProgressByState } from "../../../API/user";
import { StatusKey } from "../types";

const STATUS_KEYS: StatusKey[] = ["backlog", "todo", "doing", "done"];
const LABELS: Record<StatusKey, string> = {
  backlog: "BACKLOG",
  todo: "TODO",
  doing: "DOING",
  done: "DONE",
};

export default function ProgressBarWithAPI() {
  const [selectedStatus, setSelectedStatus] = useState<StatusKey>("backlog");
  const [progress, setProgress] = useState(0);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  const stateMap: Record<StatusKey, string> = {
    backlog: "BACKLOG",
    todo: "TO_DO",
    doing: "DOING",
    done: "DONE",
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const result = await getProgressByState(stateMap[selectedStatus]);
        if (result) setProgress(result.progressPercentage);
      } catch (err) {
        console.log("Error fetching progress", err);
      }
    };
    fetchProgress();
  }, [selectedStatus]);

  useEffect(() => {
    if (containerWidth > 0) {
      Animated.timing(widthAnim, {
        toValue: progress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, containerWidth]);

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, containerWidth],
    extrapolate: "clamp",
  });

  const onLayout = (e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width);

  return (
    <View>
      <View className="flex-row justify-between mb-2">
        {STATUS_KEYS.map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => setSelectedStatus(key)}
            className={`px-3 py-2 rounded-full ${
              key === selectedStatus ? "bg-blue-800" : "bg-blue-100"
            }`}
          >
            <Text className={key === selectedStatus ? "text-white" : "text-blue-800"}>
              {LABELS[key]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View
        onLayout={onLayout}
        style={{ width: "100%", height: 12, backgroundColor: "#E5E7EB", borderRadius: 6, overflow: "hidden", marginBottom: 4 }}
      >
        <Animated.View
          style={{
            width: animatedWidth,
            height: "100%",
            backgroundColor: "#000595ff", 
          }}
        />
      </View>

      <Text className="text-center text-sm text-blue-700">{Math.round(progress)}%</Text>
    </View>
  );
}
