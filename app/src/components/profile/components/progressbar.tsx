import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarProps {
  progress: number; // Número entre 0 y 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  
  // 1. Asegurar que el porcentaje esté siempre entre 0 y 100
  const safeProgress = Math.max(0, Math.min(100, progress));
  
  // 2. CLAVE: Calcular el ancho como un porcentaje (string) para usar en estilo en línea
  const progressWidth = `${safeProgress}%`;

  return (
    <View className="mb-6">
      {/* Barra de progreso (Fondo Gris) */}
      <View className="w-full h-2 bg-gray-300 rounded-full mb-2">
        
        {/* Progreso Actual (Barra Azul) - Usamos el estilo en línea (style) */}
        <View 
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: progressWidth } as any} 
        />
      </View>

      {/* Texto del Porcentaje (Ej: 32%) */}
      <Text className="text-center text-blue-600 mb-6">
        {safeProgress}%
      </Text>
    </View>
  );
}