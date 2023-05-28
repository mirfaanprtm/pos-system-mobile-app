import React, { createContext, useState } from "react";

// Membuat konteks StockContext
export const StockContext = createContext();

// Membuat komponen provider StockProvider
export const StockProvider = ({ children }) => {
  const [totStockIn, setTotalStockIn] = useState(0);

  // Fungsi untuk memperbarui jumlah stok
  const updateStock = (newTotal) => {
    setTotalStockIn(newTotal);
  };

  // Menyediakan nilai konteks kepada komponen anak
  return (
    <StockContext.Provider value={{ totStockIn, updateStock }}>
      {children}
    </StockContext.Provider>
  );
};
