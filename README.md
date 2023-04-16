# Dio Bank Backend
Este é o backend para o sistema bancário Dio Bank, desenvolvido como projeto integrador da faculdade. O sistema permite que os usuários consultem seus saldos, realizem depósitos e saques, bem como verifiquem seu histórico de transações. Há também um controle de acesso com autenticação usando JWT e hash de senha com bcrypt.

## Tecnologias Utilizadas
- Node.js
- Express
- MongoDB
- Bcrypt
- Jsonwebtoken

## Funcionalidades
O backend do Dio Bank suporta as seguintes funcionalidades:

- Autenticação de usuário com JWT
- Registro de novos usuários
- Verificação de saldo de conta bancária
- Realização de depósito em conta bancária
- Realização de saque em conta bancária
- Verificação de histórico de transações bancárias

## Instalação
Para instalar o backend do Dio Bank, siga os seguintes passos:

1. Clone este repositório
2. Instale as dependências do projeto utilizando o gerenciador de pacotes de sua preferência (npm ou yarn)
```bash
npm install
```
```bash
yarn install
```
3. Crie um arquivo .env na raiz do projeto, e adicione as seguintes variáveis de ambiente:
```bash
MONGO_URI=<url do banco de dados MongoDB>
JWT_SECRET=<segredo para geração do token JWT>
```
4. Inicie o servidor
```bash
npm start
```
```bash
yarn start
```

## Endpoints
O backend do Dio Bank expõe os seguintes endpoints:

- `/api/auth/register` (POST) - Registra um novo usuário
- `/api/auth/login` (POST) - Realiza a autenticação do usuário e retorna um token JWT
- `/api/accounts/:id/balance` (GET) - Retorna o saldo da conta bancária do usuário com o ID especificado
- `/api/accounts/:id/deposit` (POST) - Realiza um depósito na conta bancária do usuário com o ID especificado
- `/api/accounts/:id/withdraw` (POST) - Realiza um saque na conta bancária do usuário com o ID especificado
- `/api/accounts/:id/transactions` (GET) - Retorna o histórico de transações bancárias da conta bancária do usuário com o ID especificado

## Licença
Este projeto é licenciado sob a licença MIT. Para mais informações, consulte o arquivo LICENSE.
