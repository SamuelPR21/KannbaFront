import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ModalCreateTaskPersonal from "./modalCreateTaskPersonal";

export default function CreateTaskPersonalBtn() {

    const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
    <View className="mt-4 mb-2 items-center">
          <TouchableOpacity
              className="bg-blue-600 rounded-2xl py-3 px-8 items-center shadow-md shadow-blue-300/30 active:scale-95 transition-all duration-150"
              onPress={() => setModalVisible(true)}
          >
              <Text className="text-white font-semibold text-base tracking-wide">
                  Crear Tarea Personal
              </Text>
          </TouchableOpacity>
      </View>
      <ModalCreateTaskPersonal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible} 
       />
    </>
  );
}
