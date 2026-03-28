import Chart from "@/components/Chart";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Alert,
  Pressable,
  ScrollView,
  SafeAreaViewBase,
} from "react-native";
import { X } from "lucide-react-native";
import Send from "@/components/Send";

import { subscribeTransactions } from "@/services/transactions";
import ImageCarousel from "@/components/ImageCarousel";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense",
  );
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeTransactions((data) => {
      setTransactions(data);

      // calcular saldo
      const total = data.reduce((acc, item) => {
        if (item.type === "expense") {
          return acc - item.amount;
        } else {
          return acc + item.amount;
        }
      }, 0);

      setBalance(total);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="grid gap-5 bg-slate-200 p-5">
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View className="w-96 mx-auto pt-40">
              <View className="bg-orange-100 p-5 rounded-lg shadow-md">
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Text className="text-lg text-right">
                    <X />
                  </Text>
                </Pressable>
                <Send type={transactionType} />
              </View>
            </View>
          </Modal>

          <View>
            <Image
              source={require("../../assets/logo/Logo-X-preto.png")}
              style={{ width: 45, height: 45 }}
            />
          </View>
          <View className="flex flex-row justify-between gap-3">
            <View>
              <Text className="font-bold text-xl pb-1">Olá, Daniel</Text>
              <Text>Saldo atual:</Text>
            </View>

            <Text className="text-2xl font-bold self-end">
              {formatCurrency(balance)}
            </Text>
          </View>

          <View className="flex flex-row justify-evenly bg-white py-5 rounded-lg shadow-sm">
            <Pressable
              onPress={() => {
                setTransactionType("expense");
                setModalVisible(true);
              }}
            >
              <Image
                source={require("../../assets/icon/icon-pix.png")}
                style={{ width: 45, height: 45 }}
              />
            </Pressable>

            <Pressable onPress={() => setModalVisible(true)}>
              <Image
                source={require("../../assets/icon/money.png")}
                style={{ width: 45, height: 45 }}
              />
            </Pressable>

            <Pressable
              onPress={() => {
                setTransactionType("income");
                setModalVisible(true);
              }}
            >
              <Image
                source={require("../../assets/icon/wallet.png")}
                style={{ width: 45, height: 45 }}
              />
            </Pressable>
          </View>

          <View>
            <Text className="font-bold text-3xl text-center pb-5">
              Oferta dos Parceiros
            </Text>
            <ImageCarousel />
          </View>

          <View>
            <Text className="font-bold text-3xl text-center pb-3">
              Análise Financeira
            </Text>
          </View>

          <View className="bg-white py-5 rounded-lg shadow-sm">
            <Chart />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
