# 🛍️ Pluggy - E-commerce Platform

Uma plataforma de e-commerce moderna e completa desenvolvida com React, TypeScript e Node.js, oferecendo uma experiência de compra intuitiva e responsiva.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Dados](#estrutura-de-dados)
- [Melhorias Sugeridas](#melhorias-sugeridas)

## 🎯 Sobre o Projeto

Pluggy é uma plataforma de e-commerce completa que permite aos usuários navegar por produtos, adicionar itens ao carrinho, realizar compras e gerenciar sua conta. O projeto é dividido em duas partes principais: um frontend moderno construído com React e TypeScript, e um backend RESTful desenvolvido com Node.js e Express.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19.1.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite 7.1.7** - Build tool e dev server extremamente rápido
- **TailwindCSS 4.1.16** - Framework CSS utility-first
- **React Router DOM 7.9.5** - Roteamento para aplicações React
- **Swiper 12.0.3** - Biblioteca de carrosséis e sliders
- **React Hot Toast 2.6.0** - Sistema de notificações toast
- **SweetAlert2 11.26.10** - Alertas e modais elegantes
- **jsPDF 3.0.4** - Geração de PDFs no cliente
- **Lucide React** - Ícones modernos e leves
- **React Icons** - Biblioteca de ícones populares

### Backend
- **Node.js** - Runtime JavaScript
- **Express 5.1.0** - Framework web para Node.js
- **Nodemailer 7.0.11** - Envio de emails
- **CORS 2.8.5** - Middleware para habilitar CORS
- **dotenv 17.2.3** - Gerenciamento de variáveis de ambiente
- **Nodemon 3.1.11** - Reinicialização automática do servidor em desenvolvimento

## ✨ Funcionalidades

### 🏠 Página Inicial
- Banner promocional responsivo
- Produtos em destaque
- Carrosséis de produtos
- Navegação intuitiva

### 🛒 Sistema de Compras
- Catálogo de produtos completo
- Detalhes do produto com ficha técnica
- Carrinho de compras
- Checkout com validação de cartão de crédito
- Geração de comprovante em PDF

### 👤 Autenticação e Perfil
- Sistema de registro e login
- Dashboard do usuário
- Perfil do usuário
- Histórico de compras

### 📧 Comunicação
- Formulário de contato
- Sistema de notificações
- Confirmação de compras por email

### 🎨 Interface
- Design moderno e responsivo
- Modo escuro/claro
- Animações suaves
- Loading states
- Feedback visual para ações do usuário

## 📁 Estrutura do Projeto

```
pluggy/
├── backend/                 # Servidor Node.js/Express
│   ├── controller/         # Controladores de lógica de negócio
│   │   └── purchase.js
│   ├── routes/             # Rotas da API
│   │   ├── Auth.js
│   │   ├── contact.js
│   │   ├── notifications.js
│   │   ├── preview.js
│   │   └── purchase.routes.js
│   ├── services/           # Serviços (email, estoque, confirmação)
│   │   ├── confirmation.js
│   │   ├── email.js
│   │   └── stock.js
│   ├── server.js           # Arquivo principal do servidor
│   ├── users.json          # Armazenamento de usuários (JSON)
│   ├── confirmation.json   # Confirmações de compra
│   └── notifications.json  # Notificações do sistema
│
├── src/                    # Código fonte do frontend
│   ├── components/         # Componentes React
│   │   ├── about/         # Componentes sobre nós
│   │   ├── Checkout/      # Componentes de checkout
│   │   ├── ContactUs/     # Componentes de contato
│   │   ├── Dashboard/     # Componentes do dashboard
│   │   ├── Details/       # Detalhes de produtos
│   │   ├── H_F/           # Header e Footer
│   │   ├── Hero/          # Componentes hero/banner
│   │   ├── Products/      # Componentes de produtos
│   │   └── ...
│   ├── context/           # Context API (estado global)
│   ├── data/              # Dados estáticos (JSON)
│   │   ├── exclusiveProducts.json
│   │   └── products.json
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home.tsx
│   │   ├── ProductPage.tsx
│   │   ├── AboutUs.tsx
│   │   ├── ContactUsPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── AuthPage.tsx
│   ├── types/             # Definições TypeScript
│   ├── utils/             # Funções utilitárias
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Ponto de entrada
│
├── public/                # Arquivos estáticos
│   ├── banner/           # Imagens de banner
│   ├── imgproduct/       # Imagens de produtos
│   └── imgsnull/         # Imagens placeholder
│
├── package.json           # Dependências do frontend
├── vite.config.ts         # Configuração do Vite
├── tsconfig.json          # Configuração TypeScript
└── README.md              # Este arquivo
```

## 🔧 Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório** (ou navegue até o diretório do projeto)

2. **Instale as dependências do frontend:**
   ```bash
   npm install
   ```

3. **Instale as dependências do backend:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

## ⚙️ Configuração

### Backend

1. **Crie um arquivo `.env` na pasta `backend/`:**
   ```env
   PORT=3001
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=seu-email@gmail.com
   EMAIL_PASS=sua-senha-de-app
   ```

   > **Nota:** Para Gmail, você precisará gerar uma "Senha de App" nas configurações de segurança da sua conta Google.

2. **Certifique-se de que os arquivos JSON existem:**
   - `backend/users.json` (pode ser um array vazio `[]`)
   - `backend/confirmation.json` (pode ser um array vazio `[]`)
   - `backend/notifications.json` (pode ser um array vazio `[]`)

### Frontend

O frontend está configurado para se conectar ao backend na porta `3001`. Se necessário, ajuste a URL da API nos arquivos de configuração ou nos componentes que fazem requisições.

## 🚀 Uso

### Desenvolvimento

1. **Inicie o servidor backend:**
   ```bash
   cd backend
   npm run dev
   ```
   O servidor estará rodando em `http://localhost:3001`

2. **Em outro terminal, inicie o servidor frontend:**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite)

### Produção

1. **Build do frontend:**
   ```bash
   npm run build
   ```

2. **Preview da build:**
   ```bash
   npm run preview
   ```

## 📡 API Endpoints

### Autenticação (`/api/auth`)
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/user/:id` - Obter dados do usuário

### Contato (`/api/contact`)
- `POST /api/contact` - Enviar mensagem de contato

### Notificações (`/api/notifications`)
- `GET /api/notifications/:userId` - Obter notificações do usuário
- `POST /api/notifications` - Criar nova notificação
- `PUT /api/notifications/:id` - Atualizar notificação

### Compras (`/api`)
- `POST /api/purchase` - Processar compra
- `GET /api/purchase/:userId` - Obter histórico de compras

### Preview (`/api/preview`)
- `GET /api/preview` - Endpoint de preview

## 📜 Scripts Disponíveis

### Frontend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o linter ESLint

### Backend
- `npm run dev` - Inicia servidor com nodemon (auto-reload)

## 📊 Estrutura de Dados

### Produto
```typescript
{
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  description: string;
  technicalSpecs?: object;
  stock?: number;
}
```

### Usuário
```typescript
{
  id: number;
  name: string;
  email: string;
  password: string; // Deve ser hash em produção
}
```

### Compra
```typescript
{
  id: string;
  userId: number;
  products: Product[];
  total: number;
  date: string;
  status: string;
}
```

## 🔒 Segurança

⚠️ **Importante:** Este projeto está configurado para desenvolvimento. Para produção, considere:

- Implementar hash de senhas (bcrypt)
- Adicionar autenticação JWT
- Validar e sanitizar todas as entradas
- Implementar rate limiting
- Usar banco de dados real (PostgreSQL, MongoDB, etc.)
- Configurar HTTPS
- Implementar CORS adequadamente
- Adicionar validação de dados no backend

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 🚀 Melhorias Sugeridas

Para uma análise completa de melhorias de usabilidade, design e funcionalidades, consulte o documento **[MELHORIAS_FRONTEND.md](./MELHORIAS_FRONTEND.md)**.

O documento contém:
- ✅ 34+ sugestões de melhorias organizadas por categoria
- ✅ Priorização por impacto e esforço
- ✅ Melhorias de UX/UI, acessibilidade, performance e mais
- ✅ Roadmap sugerido em 3 fases

---

**Nota:** Este é um projeto em desenvolvimento. Algumas funcionalidades podem estar em constante evolução.
