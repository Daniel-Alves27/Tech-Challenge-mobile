import { router } from "expo-router";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login(closed: any) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Preencha todos os campos");
      return;
    }
    try {
      await login(email, password);

      router.replace("/(tabs)/Home");
    } catch (error) {
      Alert.alert("Erro ao fazer login");
    }
  };

  return (
    <View>
      <Text className="mb-2">Entre na sua conta</Text>
      <Text className="text-xs text-gray-300">
        Insira seu e-mail e senha para fazer login
      </Text>

      <View className="grid gap-4 pt-5">
        <TextInput
          className="border border-gray-300 rounded-lg placeholder:text-gray-300"
          placeholder="Ex: seuEmail@email.com"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="border border-gray-300 rounded-lg placeholder:text-gray-300"
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          className="bg-black py-5 rounded-lg"
          onPress={closed && handleLogin}
        >
          <Text className="text-white text-center font-semibold">entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}
