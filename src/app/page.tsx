import dotenv from 'dotenv'; // Para acessar os tokens do checkout e do usuário

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

  console.log("Starting API fetch...");
  console.log("User Token:", userToken ? "[REDACTED]" : "Not provided");
  console.log("Checkout Token:", checkoutToken ? "[REDACTED]" : "Not provided");

  if (!checkoutToken) {
    throw new Error("Checkout token is missing. Please check your environment variables.");
  }

  const response = await fetch(
    `https://api-candidate.ogruposix.com/checkout/${checkoutToken}`,
    {
      headers: {
        "user-token": userToken,
      },
    }
  );

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response body:", errorText);
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const data = await response.json();
  console.log("Raw API response:", data);

  if (!data || !data.object || !Array.isArray(data.object) || !data.object[0]) {
    console.error("Invalid API response structure:", data);
    throw new Error("Invalid API response structure");
  }

  console.log("Parsed API response:", data.object[0]);
  return data.object[0];
}

export default async function Home() {
  let checkout: Checkout | null = null;
  let error: string | null = null;

  try {
    console.log("Fetching checkout data...");
    checkout = await getData();
    console.log("Checkout data fetched successfully.");
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
      console.error("Error during data fetch:", error);
    } else {
      error = "An unknown error occurred";
      console.error("Unknown error:", err);
    }
  }

  if (error || !checkout) {
    console.error("Rendering error message:", error || "Unknown error occurred.");
    return (
      <div>
        <p>Error: {error || "Ocorreu algum erro."}</p>
      </div>
    );
  }

  console.log("Rendering page content...");
  return (
    <>
      <Header />

      <main className="flex flex-col justify-center items-center">
        <Hero
          title="SuperPack: Revolucione sua saúde!"
          headline={checkout.video_headline}
          videoUrl={checkout.video_url}
          subHeadline={checkout.video_sub_headline}
        />

        <div className="flex flex-col md:flex-row md:flex-wrap md:w-[80vw] md:items-center md:justify-center">
          {checkout.products.map((product) => (
            <Card
              key={product.product_id}
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
