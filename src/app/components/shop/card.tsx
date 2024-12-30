'use client';
import { useState } from "react";
import Image from "next/image";
import check from "../../../../public/Images/check.svg";
import Modal from "./modal";

interface CardInterface {
  name: string;
  price: number;
  discount: number;
  best_choice: boolean;
  freight: string;
  image_url: string;
  productId: number;
}

export default function Card({ name, price, discount, best_choice, freight, image_url, productId }: CardInterface) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Cada card tem a capacidade de abrir o modal de formulário

  const newPrice = price - discount;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); // Adicionei a capacidade do aplicativo de transformar o number para Reais (R$).

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-xl border-cardBorder border flex flex-col justify-start items-center w-[80vw] mb-3 md:w-[16vw] md:min-w-[240px] md:h-[468px] md:mx-2">
      <div>
        <Image src={image_url} alt="img" width={160} height={160} className="rounded-lg my-5" />
      </div>
      <div>
        <div className="md:w-[12vw]">
          <p className="text-base font-bold line-clamp-2 h-[48px]">{name}</p>

          <p className="text-xl line-through mt-3 mb-1">{formatCurrency(price)}</p>

          <p className="text-4xl font-black">{formatCurrency(newPrice)}</p>
        </div>
      </div>

      <div>
        <button
          onClick={handleOpenModal}
          className="text-[14px] rounded-[20px] bg-[#AAD4EE] w-[64vw] h-10 my-3 md:w-[12vw] md:min-w-[200px]"
        >
          Comprar
        </button>
        <div className="my-2">
          <div className="flex py-1">
            <Image src={check} alt="check" />
            <p className="text-[13px] ml-1">{freight}</p>
          </div>

          {best_choice && ( 
            <div className="flex py-1">
              <Image src={check} alt="check" />
              <p className="text-[13px] ml-1">Melhor escolha</p>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <Modal productId={productId} onClose={handleCloseModal} />} {/** O modal obtém o productId referente ao card */}
    </div>
  );
}
