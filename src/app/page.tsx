import { getProducts } from "@/lib/stripe";
import hero from "@/assets/hero.png";
import { Product } from "@/components/home/product";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();

  console.log(products);
  return (
    <main>
      <section className="border-b">
        <div className="container flex">
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-bold">
              A <span className="text-red-500"> melhor </span> Pizza da cidade
            </h1>
            <p className="mt-4 text-2xl">
              Faça seu pedido agora e experimente o sabor autêntico da Itália
              entregue na sua porta.
            </p>
          </div>
          <Image
            src={hero}
            alt={"Mulher de camisa vermelha segurando caixas de pizza"}
            width={500}
          />
        </div>
      </section>

      <section>
        <div className="container py-14">
          <h2 className="mb-4 text-3xl font-semibold"> Nosso Cardápio</h2>
          <ul className="grid grid-cols-4 gap-8">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
