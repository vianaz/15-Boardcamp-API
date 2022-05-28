import express, { json } from 'express';
import chalk from 'chalk';
import cors from 'cors';

import connection from './db.js';

const app = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cors());

app.listen(PORT, () => {
    console.log(chalk.bold.blue(`Servidor iniciado com sucesso na porta ${PORT}`));
})