// src/components/home/components/Tablero/StateColumn.tsx
import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { TareaKanban } from "../../hooks/useTareasKanban";

interface Props {
  title: string;
  accentClassName: string;
  borderClassName: string;
  colorPreview: string;
  tareas: TareaKanban[];
  onPress?: () => void;
}

export default function StateColumn({
  title,
  accentClassName,
  borderClassName,
  colorPreview,
  tareas,
  onPress,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onPress && onPress();
    });
  };

  const animatedStyle: StyleProp<ViewStyle> = {
    transform: [{ scale }],
  };

  const tareasPreview = tareas.slice(0, 3);
  const restantes = tareas.length - tareasPreview.length;

  return (
    <Animated.View style={animatedStyle} className="w-[45%] mb-4">
      <Pressable onPress={handlePress}>
        <View
          className={`rounded-3xl bg-white border ${borderClassName} pb-3 overflow-hidden`}
        >
          {/* Header */}
          <View
            className={`h-10 rounded-t-3xl ${accentClassName} items-center justify-center`}
          >
            <Text className="text-xs font-bold text-white tracking-widest">
              {title.toUpperCase()}
            </Text>
          </View>

          {/* Mini preview */}
          <View className="px-4 pt-4 items-center min-h-[70px]">
            <View className="flex-row flex-wrap gap-2 justify-center mb-2">
              {tareasPreview.length === 0 ? (
                <View className="w-5 h-5 rounded-md bg-slate-200 opacity-60" />
              ) : (
                tareasPreview.map((t) => (
                  <View
                    key={t.id}
                    className={`w-5 h-5 rounded-md ${colorPreview}`}
                  />
                ))
              )}

              {restantes > 0 && (
                <Text className="text-[11px] text-slate-500 ml-1">
                  +{restantes}
                </Text>
              )}
            </View>
          </View>

          {/* Contador centrado */}
          <View className="items-center">
            <Text className="text-[11px] text-slate-500 font-medium mt-1">
              📌 {tareas.length}{" "}
              {tareas.length === 1
                ? "tarea personal"
                : "tareas personales"}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
