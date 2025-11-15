import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StatusKey } from "../types";


const LABELS: Record<StatusKey, string> = {
    backlog: "BACKLOG",
    todo: "TO DO",
    doing: "DOING",
    done: "DONE",
  };
  
  interface Props {
    selected: StatusKey;
    onSelect: (s: StatusKey) => void;
  } 

  export default function ProgressStatusSelector({ selected, onSelect }: Props) {
    const items: StatusKey[] = ["backlog", "todo", "doing", "done"];
  
    return (
      <View className="flex-row justify-between my-2">
        {items.map((k) => {
          const active = k === selected;
          return (
            <TouchableOpacity
              key={k}
              onPress={() => onSelect(k)}
              className={`px-3 py-2 rounded-full flex-row items-center justify-center ${
                active ? "bg-blue-800" : "bg-blue-100"
              }`}
            >
              <Text className={`text-sm font-semibold ${active ? "text-white" : "text-blue-800"}`}>
                {LABELS[k]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }