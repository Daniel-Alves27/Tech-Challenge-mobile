import {
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { CircleDollarSign } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  subscribeTransactions,
  deleteTransaction,
} from "@/services/transactions";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeTransactions(setTransactions);
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Tem certeza?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => deleteTransaction(id),
      },
    ]);
  };

  const filteredData = transactions.filter((item) => {
    const matchesCategory = filter === "ALL" || item.category === filter;

    const matchesType = typeFilter === "ALL" || item.type === typeFilter;

    const matchesSearch = item.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    let matchesDate = true;

    if (dateFilter === "MONTH") {
      const date = item.createdAt?.seconds
        ? new Date(item.createdAt.seconds * 1000)
        : new Date();

      const now = new Date();

      matchesDate =
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
    }

    return matchesCategory && matchesType && matchesSearch && matchesDate;
  });

  //formatar valor
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // 📋 item
  const renderItem = ({ item }: any) => (
    <View className="flex flex-row justify-between items-center mx-5 py-4 border-b border-gray-200">
      <Pressable
        className="flex flex-row gap-3 flex-1"
        onPress={() =>
          router.push({
            pathname: "/AddEditTransaction",
            params: {
              id: item.id,
              title: item.title,
              amount: String(item.amount),
              category: item.category,
            },
          })
        }
      >
        <CircleDollarSign color={item.type === "expense" ? "red" : "green"} />

        <View>
          <Text className="font-semibold">{item.title}</Text>
          <Text className="text-gray-500 text-sm">{item.category}</Text>
        </View>
      </Pressable>

      <View className="items-end">
        <Text
          className={`font-bold ${
            item.type === "expense" ? "text-red-500" : "text-green-600"
          }`}
        >
          {item.type === "expense" ? "-" : "+"} {formatCurrency(item.amount)}
        </Text>

        <Pressable onPress={() => handleDelete(item.id)}>
          <Text className="text-red-400 text-xs">Excluir</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Text className="ms-5 py-4 font-bold mb-2 text-3xl">Transações</Text>

          {/* 🔍 BUSCA */}
          <TextInput
            placeholder="Buscar transação..."
            value={search}
            onChangeText={setSearch}
            className="mx-5 p-2 border rounded mb-3"
          />

          {/* 📂 FILTRO CATEGORIA */}
          <View className="flex flex-row flex-wrap gap-3 px-5 mb-2">
            <Pressable
              className="bg-black rounded-lg py-2 w-28"
              onPress={() => setFilter("ALL")}
            >
              <Text className="text-white text-center">Todos</Text>
            </Pressable>
            <Pressable
              className="bg-black rounded-lg py-2 w-28"
              onPress={() => setFilter("PIX")}
            >
              <Text className="text-white text-center">PIX</Text>
            </Pressable>
            <Pressable
              className="bg-black rounded-lg py-2 w-28"
              onPress={() => setFilter("DOC")}
            >
              <Text className="text-white text-center">DOC</Text>
            </Pressable>
            <Pressable
              className="bg-black rounded-lg py-2 w-28"
              onPress={() => setFilter("DEPÓSITO")}
            >
              <Text className="text-white text-center">Depósito</Text>
            </Pressable>
          </View>

          {/* 💰 FILTRO TIPO */}
          <View className="flex flex-row flex-wrap gap-3 px-5 mb-2">
            <Pressable
              className="bg-black rounded-lg py-2 w-28"
              onPress={() => setTypeFilter("ALL")}
            >
              <Text className="text-white text-center">Todos</Text>
            </Pressable>
            <Pressable
              className="bg-black rounded-lg py-2 w-28"
              onPress={() => setTypeFilter("income")}
            >
              <Text className="text-white text-center">Entrada</Text>
            </Pressable>
            <Pressable
              className="bg-black rounded-lg py-2 w-28"
              onPress={() => setTypeFilter("expense")}
            >
              <Text className="text-white text-center">Saída</Text>
            </Pressable>
          </View>

          {/* 📅 FILTRO DATA */}
          <View className="flex flex-row gap-3 px-5 mb-3">
            <Pressable
              className="bg-black rounded-lg py-2 w-28"
              onPress={() => setDateFilter("ALL")}
            >
              <Text className="text-white text-center">Tudo</Text>
            </Pressable>
            <Pressable
              className="bg-black rounded-lg py-2 w-28"
              onPress={() => setDateFilter("MONTH")}
            >
              <Text className="text-white text-center">Este mês</Text>
            </Pressable>
          </View>

          {/* 📋 LISTA */}
          <FlatList
            data={filteredData}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <Text className="text-center mt-10 text-gray-400">
                Nenhuma transação encontrada
              </Text>
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
