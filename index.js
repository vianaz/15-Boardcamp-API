import express, { json } from 'express';
import chalk from 'chalk';
import cors from 'cors';

import categoriesRouter from './routes/categoriesRouter.js';
import gamesRouter from './routes/gamesRouter.js';

const app = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cors());

app.use(categoriesRouter);
app.use(gamesRouter);

app.listen(PORT, () => {
  console.log(
    chalk.bold.blue(`Servidor iniciado com sucesso na porta ${PORT}`),
  );
});
