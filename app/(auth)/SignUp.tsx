import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

export default function Signup() {
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      await signUp(email, password);

      Alert.alert("Conta criada com sucesso!");
    } catch (error) {
      Alert.alert("Erro ao criar conta");
    }
  };

  return (
    <View>
      <Text className="mb-2">Abra uma conta</Text>
      <Text className="text-xs text-gray-300">
        Digite suas informações abaixo para criar sua conta
      </Text>

      <View className="grid gap-4 pt-5">
        <TextInput
          className="border border-gray-300 rounded-lg placeholder:text-gray-300"
          placeholder="Ex: Mario"
          value={name}
          onChangeText={setName}
        />

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

        <Pressable onPress={handleSignUp}>
          <Text>Criar conta</Text>
        </Pressable>
      </View>
    </View>
  );
}
