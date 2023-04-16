import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import UserRouter from './routes/user.route.js';
import AuthRouter from './routes/auth.route.js';
import BankRouter from './routes/bank.route.js'
import connectDatabase from './database/connect.js';

dotenv.config();

const app = express();
const porta = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/users', UserRouter);
app.use('/accounts', BankRouter);
app.use('/auth', AuthRouter);

connectDatabase();
app.listen(porta, () => console.log(`
  Servidor conectado na porta ${porta}
`));
