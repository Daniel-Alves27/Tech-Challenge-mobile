import { router } from "expo-router";
import { View, Image, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { addTransaction } from "@/services/transactions";

export default function Send({ type }: { type: "income" | "expense" }) {
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    if (!amount) {
      Alert.alert("Digite um valor");
      return;
    }

    try {
      await addTransaction({
        title: type === "income" ? "Depósito" : "Transferência",
        amount: Number(amount),
        category: type === "income" ? "DEPÓSITO" : "PIX",
        type,
      });

      Alert.alert("Transferência realizada!");

      router.replace("/(tabs)/Home");
    } catch (error) {
      Alert.alert("Erro ao enviar");
    }
  };

  return (
    <View>
      <Text className="text-3xl font-bold text-center pb-5">
        {type === "income" ? "Receber Dinheiro" : "Fazer Transferência"}
      </Text>

      <View className="flex flex-col items-center gap-2">
        <Image
          source={require("../assets/images/profile-woman.png")}
          style={{ width: 45, height: 45 }}
        />
        <Text className="font-extrabold text-lg">Daniel A. Santos</Text>
        <Text>+55 11 955501234</Text>
      </View>

      <TextInput
        className="bg-white ps-2 my-5 border border-gray-300 rounded-lg"
        placeholder="Digite um Valor"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Pressable className="bg-black py-3 rounded-lg" onPress={handleSend}>
        <Text className="text-white text-lg text-center">enviar</Text>
      </Pressable>
    </View>
  );
}
