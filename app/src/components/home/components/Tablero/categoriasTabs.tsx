import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  categorias: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoriaTabs({ categorias, selectedCategory, onSelect }: Props) {
  return (
    <View className="flex-row justify-around mb-3 mt-4">
      {categorias.map((cat) => (
        <TouchableOpacity key={cat} onPress={() => onSelect(cat)}>
          <Text
            className={`font-semibold ${
              selectedCategory === cat
                ? "border-b-2 border-blue-700 text-blue-700"
                : "text-blue-500"
            }`}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
