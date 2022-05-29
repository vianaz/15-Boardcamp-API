import joi from 'joi';
import connection from '../db.js';

export async function getGames(req, res) {
  const { rows } = await connection.query('SELECT * FROM games');
  res.status(200).send(rows);
}
export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string(),
    stockTotal: joi.number().min(1).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().min(1).required(),
  });
  const { error } = gameSchema.validate(req.body);
  if (error) {
    res.sendStatus(400);
    return;
  }
  const { rows: categoryIdQuery } = await connection.query(
    `SELECT * FROM games WHERE "categoryId" = $1`,
    [categoryId],
  );
  const { rows: nameQuery } = await connection.query(
    'SELECT * FROM games WHERE name = $1',
    [name],
  );
  if (!categoryIdQuery[0]) {
    res.sendStatus(400);
    return;
  }
  if (nameQuery[0]) {
    res.sendStatus(409);
    return;
  }
  await connection.query(
    'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5)',
    [name, image, stockTotal, categoryId, pricePerDay],
  );
  res.sendStatus(201)
}
