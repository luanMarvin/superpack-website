import dotenv from 'dotenv'; // Para acessar os tokens do checkout e do usuario

import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Card from "./components/shop/card";
import Footer from "./components/footer/footer";

dotenv.config();

interface Product {
  product_id: number;
  name: string;
  price: number;
  discount: number;
  freight: string;
  image_url: string;
  best_choice: boolean;
}

interface Checkout {
  video_headline: string;
  video_sub_headline: string;
  video_url: string;
  products: Product[];
}


async function getData() {
  const userToken = process.env.UserToken || "";
  const checkoutToken = process.env.checkoutToken;

  const response = await fetch(
    `https://api-candidate.ogruposix.com/checkout/${checkoutToken}`, //O token do checkout é usado aqui, e o do usuário logo abaixo
    {
      headers: {
        "user-token": userToken, // ambos obtidos pelas váriaveis de ambiente
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`); 
  }

  const data = await response.json();

  if (!data || !data.object || !data.object[0]) {
    throw new Error("Invalid API response structure");
  }

  return data.object[0]; // a função obtém os dados e trata os erros.
}

export default async function Home() {
  let checkout: Checkout | null = null;
  let error: string | null = null;

  try {
    checkout = await getData();
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "An unknown error occurred";
    }
  }

  if (error || !checkout) { //Caso dê algum erro no fetch, a aplicação não terá seus elementos carregados.
    return <div>
      <p>
        Error: {error || "Ocorreu algum erro."}
      </p>
    </div>;
    }

  return (
    <>
      <Header />

      <main className="flex flex-col justify-center items-center">
        <Hero
          title="SuperPack: Revolucione sua saúde!" // Esse titulo adicionei por contra propria, além de trazer um designer melhor coloquei a capacidade de mudar por components
          headline={checkout.video_headline}
          videoUrl={checkout.video_url}
          subHeadline={checkout.video_sub_headline}
        />
        
        <div className="flex flex-col md:flex-row md:flex-wrap md:w-[80vw] md:items-center md:justify-center">
          {checkout.products.map((product) => (
            <Card
              key={product.product_id} // Esse valor foi adicionado para evitar o erro causado pelo next que requer a chave de cada elemento mapeado
              productId={product.product_id}
              name={product.name}
              price={product.price}
              discount={product.discount}
              best_choice={product.best_choice}
              freight={product.freight}
              image_url={product.image_url}
            />
          ))}
        </div>
        
      </main>

      <Footer />
    </>
  );
}
