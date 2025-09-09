# Innovation Brindes - Aplicação de Produtos

## Sobre o Projeto

Este é um projeto desenvolvido em Next.js 15 com React, TailwindCSS e TypeScript. A aplicação permite visualizar produtos com detalhes, cores, preços e funcionalidades de favoritos. 

**Decisões técnicas importantes:**
- **Fetch nativo** ao invés de Axios para reduzir dependências externas e otimizar bundle.
- **React Query** para gerenciamento de estado e cache de requisições.
- **Shadcn UI** e **TailwindCSS** para estilização, garantindo consistência e facilidade na manutenção.
- **Next/Image** para otimização automática de imagens.
- **Middleware** para controle de autenticação via token.

**Performance:**  
- O site obteveo pico de **70% de performance**, porém se manteve nos 65% no Lighthouse tendo **1 dia útil de desenvolvimento**.
- Algumas decisões, como o uso do fetch e React Query, ajudaram a reduzir o tempo de carregamento e requests desnecessários.

![Performance do site](/performance.png)

-- Em caso de não carregamento da imagem, a mesma está dentro da pasta public do projeto.

---

## Estrutura do Projeto

src/
├─ app/
├─ components/      
├─ hooks/           
├─ stores/          
├─ utils/           
├─ services/        
├─ providers/       
└─ middleware.ts    


### Providers no Layout

No `layout.tsx`, a aplicação inclui todos os Providers necessários:

- `QueryClientProvider` para React Query
- `ThemeProvider` caso seja necessário para UI
- Outros providers globais para estado ou contexto

### Middleware

O `middleware.ts` controla acesso às rotas privadas com base no token de autenticação armazenado nos cookies.  

---

## Instalação e Execução

### 1. Instalar dependências
- npm install

### 2. Criar arquivo .env.local com as variáveis de ambiente
- NEXT_PUBLIC_BASE_URL=https://api.innovationbrindes.com.br

### 3. Rodar a aplicação em desenvolvimento
- npm run dev

### 4. Rodar testes
- npm run test

---

## Observações

- Durante o desenvolvimento desta aplicação, consegui alcançar uma performance de 70% no Lighthouse. Considerando que o projeto foi desenvolvido em apenas 1 dia útil, este resultado é um indicador positivo de que as decisões técnicas adotadas — como uso de fetch nativo, React Query para caching, lazy-loading de imagens, memoização de componentes e otimizações de layout com Tailwind CSS — ajudaram a manter a aplicação leve e rápida. Refatorações sempre serão fundamentais.

- Ainda existem oportunidades para melhorar a performance, como otimização de imagens de produtos, pré-carregamento de dados e refinamento de CSS crítico, mas a base construída garante boa experiência de usuário e escalabilidade para evoluções futuras.

- Todas as requisições usam fetch e estão preparadas para tratamento de erros.

- Imagens de produtos têm placeholder e carregamento lazy para melhorar performance.

- Modo dark, foi montado o setup porém sem tempo para implementar.

- Placeholder de Imagens de produtos.

- Testes unitários com Jest e React Testing Library.

- Criação de variante de botão e inputs para reutilização na listagem de produtos, input search.

- Funcionalidades como favoritos, diálogo de produto e paginação estão implementadas com Zustand e React Query.

- Escolha entre desc e asc nos filtros ficaram pendentes.

- Vídeo .mp4 do fluxo do teste: [fluxo-teste.mp4](./fluxo-teste.mp4) -> Em caso de não carregamento, deixarei em anexo junto ao e-mail.

---

## Tecnologias Utilizadas

Next.js 15

React 18+

TypeScript

TailwindCSS v4

Shadcn

React Query

Lucide Icons

Sonner (toast notifications)

Zod + React Hook Form