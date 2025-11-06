import { Text } from "react-native";

export default function TituloApp({ title }: { title: string }) {
  return (
    <Text className="text-3xl font-bold text-center mb-6 text-blue-700">
      {title}
    </Text>
  );
}
