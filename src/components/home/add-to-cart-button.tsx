"use client";

import { Check, ShoppingCart } from "lucide-react";

import { Button } from "../ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "../ui/use-toast";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addProduct } = useCart();
  const { toast } = useToast();
  const handleAddProduct = () => {
    addProduct({
      ...product,
      quantity: 1,
    });

    toast({
      action: (
        <div className="flex w-full items-center gap-4">
          <Check className="text-emerald-600"></Check>
          <span>Produto adicionado no carrinho</span>
        </div>
      ),
    });
  };

  return (
    <Button onClick={handleAddProduct}>
      <ShoppingCart className="m-2 size={20}" />
      Adicionar ao Carrinho
    </Button>
  );
}
