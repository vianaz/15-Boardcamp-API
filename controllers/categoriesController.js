import joi from 'joi';
import connection from '../db.js';

export async function getCategories(req, res) {
  const query = await connection.query('SELECT * FROM categories');
  res.status(200).send(query.rows);
}
export async function postCategories(req, res) {
  const { name } = req.body;
  const categoriesSchema = joi.object({
    name: joi.string().required(),
  });
  const { error } = categoriesSchema.validate(req.body);
  if (error) {
    res.sendStatus(400);
    return;
  }
  const { rows } = await connection.query(
    `SELECT * FROM categories WHERE name = $1`,
    [name],
  );
  // Return undefined if category dont exist
  if (rows[0]) {
    res.sendStatus(409);
    return;
  }
  connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);
  res.sendStatus(201);
}
