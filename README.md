# Projeto Web Super Pack ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Sobre o Projeto

O objetivo dessa aplicação é cumprir o desafio de consumo de API proposto pelo Grupo Six.

O consumo dos dados da API tem como foco principal mostrar uma gama de produtos e informações sobre o mesmo.

Por se tratar de um ambiente de testes, os materiais fornecidos são fictícios e/ou não condizentes com um produto real.

### Comentários

Esse projeto terá comentários em básicamente todos os arquivos, cujo objetivo será poupar a leitura do código e acentuar tomadas de decisões.
O excesso de comentários se torna real nesse projeto exclusivamente por se tratar de um projeto de teste.
Todos os comentários desse projeto foram feitos manualmente, e nenhum auxilio externo (como AI's foram utilizados)

### Revisão

A utilização de programas externos (como figma e AI's) tiveram uma participação na confecção dessa aplicação. Onde seus objetivos foram auxiliar na velocidade de desenvolvimento.
A revisão desse projeto também foi feito de forma manual.

## Como iniciar e executar o Projeto

No console, vá para o diretório do projeto e digite:

```bash
npm run dev
```

Adicione ao arquivo .env as seguinte informações:

```bash
UserToken="token-do-usuario"
checkoutToken="checkout-da-api"
```

A url está programada para fazer a requisição para o site do Grupo Six, mas é capaz de obter vários tipos de produtos (cujo é representado pelo token do checkout, ou seja, é capaz de funcionar em diferentes caminhos da mesma API)

Abra [http://localhost:3000](http://localhost:3000) com o seu navegador.

É necessário ter o npm e node 20^ para rodar a aplicação perfeitamente.

## Online

O deploy da aplicação foi feito pela vercel e está dísponivel para acesso online.
Acesse: [https://superpack-website.vercel.app/](https://superpack-website.vercel.app/)
