import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { changeUserRoleInProject, listUsersInProject, removeUserFromProject } from "../../../../../API/user_proyect";

type Integrante = {
  id: string;
  userId: string;
  nombre: string;
  rol: string | null;
};

type Props = {
  projectId: number | string;
  integrantes: Integrante[];
  setIntegrantes: React.Dispatch<React.SetStateAction<Integrante[]>>;
  nuevoIntegrante?: any;
};

export default function ListaIntegrantes({ projectId, integrantes, setIntegrantes }: Props) {

  const [showIntegrantes, setShowIntegrantes] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setSelectedRole(null);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await listUsersInProject(projectId); 
      if (users) {
        setIntegrantes(
          users.map((user: any) => ({
            id: String(user.userProyectId),
            userId: String(user.userId),
            nombre: user.userName,
            rol:
              user.role === "MANAGER"
                ? "1"
                : user.role === "COLABORADOR"
                ? "2"
                : null
          }))
        );

      }
    };
    fetchUsers();
  }, [projectId]);

  const eliminarIntegrante = (id: string | number) => {
  Alert.alert(
    "¿Eliminar integrante?",
    "Esta acción no se puede deshacer.",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          // Aseguramos enviar id numérico si la API lo espera
          const numericId = Number(id);
          const resp = await removeUserFromProject(numericId);

          if (resp?.success) {
            setIntegrantes(prev =>
              prev.filter(integrante => integrante.id !== String(id))
            );
          } else {
            Alert.alert("No se pudo eliminar", resp?.message || "Error inesperado");
          }
        },
      },
    ]
  );
};


  const handleChangeRole = async () => {
    if (!selectedRole) {
      Alert.alert("Error", "Debe seleccionar un rol.");
      return;
    }

    const success = await changeUserRoleInProject(
      selectedUser.userId,
      projectId,
      selectedRole
    );



    if (success) {
      Alert.alert("✔︎ Éxito", "El rol del usuario fue actualizado.");

      setIntegrantes(prev =>
        prev.map(u =>
          u.id === selectedUser.id
            ? { ...u, rol: selectedRole }
            : u
        )
      );

      setShowModal(false);
    } else {
      Alert.alert("Error", "No se pudo cambiar el rol.");
    }
  };

  return (
    <View className="mb-6">

      {/* HEADER */}
      <TouchableOpacity
        onPress={() => setShowIntegrantes(prev => !prev)}
        className="mb-3 flex-row justify-between items-center"
      >
        <Text className="text-blue-900 ml-1 font-bold text-xl">
          Integrantes del proyecto
        </Text>

        <Text className="text-blue-600 text-xl font-bold">
          {showIntegrantes ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {/* LISTA */}
      {showIntegrantes && (
        <View
          className="rounded-2xl p-3"
          style={{
            maxHeight: 260,
            backgroundColor: "#e8f1ff",
            borderWidth: 1,
            borderColor: "#c4ddff",
          }}
        >
          <FlatList
            data={integrantes}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                className="flex-row justify-between items-center bg-white p-4 mb-3 rounded-2xl"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 3,
                  borderLeftWidth: 5,
                  borderLeftColor: "#3b82f6",
                }}
              >
                <View>
                  <Text className="text-blue-900 font-bold text-base">
                    {item.nombre}
                  </Text>

                  <Text className="text-blue-700">
                    Rol: {item.rol === "1" ? "Manager" : item.rol === "2" ? "Colaborador" : "Sin rol"}
                  </Text>

                </View>

                <View className="flex-row gap-3">

                  {/* Editar */}
                  <TouchableOpacity
                    onPress={() => openEditModal(item)}
                    className="px-3 py-2 rounded-xl bg-yellow-400"
                    style={{ minWidth: 42, alignItems: "center" }}
                  >
                    <Text className="text-white font-bold text-lg">✏️</Text>
                  </TouchableOpacity>

                  {/* Eliminar */}
                  <TouchableOpacity
                    onPress={() => eliminarIntegrante(item.id)}
                    className="px-3 py-2 rounded-xl bg-red-600"
                    style={{ minWidth: 42, alignItems: "center" }}
                  >
                    <Text className="text-white font-bold text-lg">−</Text>
                  </TouchableOpacity>

                </View>
              </View>
            )}
          />
        </View>
      )}

      {/* MODAL MEJORADO */}
      {showModal && (
        <View
          className="bg-black/40 justify-center items-center"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 20,
            zIndex: 9999,
          }}
        >
          <View
            className="bg-white w-full p-7 rounded-3xl"
            style={{
              maxWidth: 360,
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Text className="text-2xl font-extrabold mb-6 text-blue-900 text-center">
              Cambiar rol
            </Text>

            {/* Manager */}
            <TouchableOpacity
              className={`p-4 rounded-2xl mb-3 ${
                selectedRole === "1" ? "bg-blue-300" : "bg-blue-100"
              }`}
              onPress={() => setSelectedRole("1")}
            >
              <Text className="text-blue-900 font-bold text-center text-lg">
                Manager
              </Text>
            </TouchableOpacity>

            {/* Colaborador */}
            <TouchableOpacity
              className={`p-4 rounded-2xl mb-3 ${
                selectedRole === "2" ? "bg-blue-300" : "bg-blue-100"
              }`}
              onPress={() => setSelectedRole("2")}
            >
              <Text className="text-blue-900 font-bold text-center text-lg">
                Colaborador
              </Text>
            </TouchableOpacity>

            {/* Confirmar */}
            <TouchableOpacity
              className="bg-blue-800 mt-2 py-3 rounded-2xl"
              onPress={handleChangeRole}
            >
              <Text className="text-white text-center font-bold text-lg">
                Confirmar
              </Text>
            </TouchableOpacity>

            {/* Cancelar */}
            <TouchableOpacity
              className="bg-gray-300 mt-3 py-2.5 rounded-xl"
              onPress={() => setShowModal(false)}
            >
              <Text className="text-center text-gray-700 font-bold text-base">
                Cancelar
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
    </View>
  );
}
