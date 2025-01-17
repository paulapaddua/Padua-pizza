import { Cart } from "@/components/home/cart";
import { Pizza } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-6">
        <Link className="flex items-center gap-2" href="/">
          <Pizza className="text-red-500 size={40}"></Pizza>
          <span className="text-3xl font-semibold">Pádua Pizza </span>
        </Link>
        <Cart></Cart>
      </div>
    </header>
  );
}
