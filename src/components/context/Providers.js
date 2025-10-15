"use client";

import { CartProvider } from "./cartContext";
import { AuthProvider } from "./authContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}