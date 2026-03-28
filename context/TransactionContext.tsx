import { createContext, useContext, useState } from "react";

type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
};

type ContextType = {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
};

const TransactionContext = createContext({} as ContextType);

export const TransactionProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);