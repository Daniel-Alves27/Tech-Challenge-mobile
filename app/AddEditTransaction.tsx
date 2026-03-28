import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { addTransaction, updateTransaction } from "@/services/transactions";

export default function AddEditTransaction() {
  const params = useLocalSearchParams();

  const isEditing = !!params?.id;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (isEditing) {
      setTitle(params.title as string);
      setAmount(String(params.amount));
      setCategory(params.category as string);
    }
  }, []);

  const validate = () => {
    if (!title || !amount || !category) {
      Alert.alert("Preencha todos os campos");
      return false;
    }

    if (isNaN(Number(amount))) {
      Alert.alert("Valor inválido");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      if (isEditing) {
        await updateTransaction(params.id as string, {
          title,
          amount: Number(amount),
          category,
        });

        Alert.alert("Transação atualizada!");
      } else {
        await addTransaction({
          title,
          amount: Number(amount),
          category,
        });

        Alert.alert("Transação criada!");
      }

      router.back();
    } catch (error) {
      Alert.alert("Erro ao salvar a transação");
    }
  };

  return (
    <View className="flex-1 p-5 gap-4">
      <Text className="text-xl font-bold">
        {isEditing ? "Editar Transação" : "Nova Transação"}
      </Text>

      <TextInput
        placeholder="Descrição"
        value={title}
        onChangeText={setTitle}
        className="border p-3 rounded"
      />

      <TextInput
        placeholder="Valor"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        className="border p-3 rounded"
      />

      <TextInput
        placeholder="Categoria (PIX, TED, DOC...)"
        value={category}
        onChangeText={setCategory}
        className="border p-3 rounded"
      />

      <Pressable onPress={handleSave} className="bg-green-500 p-4 rounded mt-4">
        <Text className="text-white text-center font-bold">Salvar</Text>
      </Pressable>
    </View>
  );
}
