'use client';
import { useState, useEffect } from "react";
import dotenv from 'dotenv';

interface ModalProps {
  productId: number;
  onClose: () => void;
}

dotenv.config();

export default function Modal({ productId, onClose }: ModalProps) {
  const UserToken = process.env.UserToken || "";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    street_number: "",
    street: "",
    district: "",
    city: "",
    state: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  // O useEffect para verificar se o formulário é válido é independente
  useEffect(() => {
    const { name, email, phone_number, street_number, street, district, city, state } = formData;

    const isValid = (
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone_number.trim() !== "" &&
      street_number.trim() !== "" && !isNaN(Number(street_number)) && Number(street_number) > 0 &&
      street.trim() !== "" &&
      district.trim() !== "" &&
      city.trim() !== "" &&
      state.trim() !== ""
    );

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api-candidate.ogruposix.com/buy/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-token": UserToken,
        },
        body: JSON.stringify({ 
          ...formData, 
          product_id: Number(productId),
          street_number: Number(formData.street_number)
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Erro ao enviar dados de compra.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[90vw] md:w-[400px]">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-xl">Obrigado pela sua compra!</h2>
            <button onClick={onClose} className="mt-4 text-blue-500">Fechar</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl mb-4">Formulário de Compra</h2>
            <div className="mb-3">
              <label htmlFor="name" className="block">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                placeholder="Seu nome"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                placeholder="Seu e-mail"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone_number" className="block">Telefone:</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                placeholder="Seu telefone"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="street_number" className="block">Número da Rua:</label>
              <input
                type="text"
                id="street_number"
                name="street_number"
                value={formData.street_number}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                placeholder="Número da rua"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="street" className="block">Rua:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                placeholder="Nome da rua"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="district" className="block">Bairro:</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                placeholder="Bairro"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="block">Cidade:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Cidade"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="block">Estado:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Estado"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`bg-blue-500 text-white rounded px-6 py-2 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isFormValid} 
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 ml-5 text-gray-500"
              >
                Fechar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
