import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define transaction type
export type Transaction = {
  id: number;
  date: string;
  type: 'minted' | 'sold';
  description: string;
  amount: number;
  inr: number;
};

// Define wallet context type
type WalletContextType = {
  balance: number;
  transactions: Transaction[];
  updateBalance: (newBalance: number) => void;
  addCoins: (amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
};

// Create the context with default values
const WalletContext = createContext<WalletContextType>({
  balance: 0,
  transactions: [],
  updateBalance: () => {},
  addCoins: () => {},
  addTransaction: () => {},
});

// Create the provider component
type WalletProviderProps = {
  children: ReactNode;
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // Initialize balance to 0 for new user experience
  const [balance, setBalance] = useState<number>(0);
  // Initialize transactions to empty array for new user experience
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Update balance directly
  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  // Add coins to the current balance
  const addCoins = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount);
  };

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: transactions.length + 1
    };
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, updateBalance, addCoins, addTransaction }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the wallet context
export const useWallet = () => useContext(WalletContext);