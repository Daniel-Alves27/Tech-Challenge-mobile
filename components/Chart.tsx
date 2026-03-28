import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import { subscribeTransactions } from "@/services/transactions";

export default function Chart() {
  const [data, setData] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeTransactions((transactions) => {
      let income = 0;
      let expense = 0;

      const grouped: any = {};

      transactions.forEach((item: any) => {
        const date = item.createdAt?.seconds
          ? new Date(item.createdAt.seconds * 1000)
          : new Date();

        const month = date.toLocaleString("pt-BR", { month: "short" });

        if (!grouped[month]) {
          grouped[month] = {
            income: 0,
            expense: 0,
          };
        }

        if (item.type === "income") {
          grouped[month].income += item.amount;
          income += item.amount;
        } else {
          grouped[month].expense += item.amount;
          expense += item.amount;
        }
      });

      const chartData = Object.keys(grouped).map((month) => ({
        label: month,
        stacks: [
          {
            value: grouped[month].expense,
            color: "red",
          },
          {
            value: grouped[month].income,
            color: "green",
          },
        ],
      }));

      setData(chartData);
      setTotalIncome(income);
      setTotalExpense(expense);
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
    <View>
      <View className="flex flex-row justify-between px-5 mb-3">
        <Text className="text-green-600">+ {formatCurrency(totalIncome)}</Text>
        <Text className="text-red-500">- {formatCurrency(totalExpense)}</Text>
      </View>

      <BarChart
        width={340}
        rotateLabel
        noOfSections={4}
        stackData={data}
        spacing={40}
      />
    </View>
  );
}
