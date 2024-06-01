"use client";
import { Product } from "@/components/home/product";
import { PropsWithChildren, useState, createContext, useContext } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface createContextProps {
  products: Product[];
  total: number;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (productId: string, quantity: number) => void;
}

const CartContext = createContext<createContextProps | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (productToAdd: Product) => {
    const productIndex = products.findIndex(
      (product) => product.id === productToAdd.id,
    );
    if (productIndex === -1) {
      setProducts([...products, productToAdd]);
    } else {
      const newProducts = products.map((product) => {
        if (product.id === productToAdd.id) {
          return {
            ...product,
            quantity: product.quantity + productToAdd.quantity,
          };
        }
        return product;
      });

      setProducts(newProducts);
    }
  };
  const removeProduct = (productId: string) => {
    const newProducts = products.filter((product) => product.id !== productId);

    setProducts([...newProducts]);
  };

  const updateProduct = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }
    const newProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity,
        };
      }
      return product;
    });
    setProducts([...newProducts]);
  };

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        updateProduct,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  ("");
  if (!cart) {
    throw new Error("useCart precisa ser acessado dentro do CartProvider");
  }
  return cart;
}
