import joi from 'joi';
import connection from '../db.js';

export async function getCustomers(req, res) {
  const { rows } = await connection.query('SELECT * FROM customers');
  res.status(200).send(rows);
}
export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const customersSquema = joi.object({
    name: joi.string().required(),
    phone: joi
      .string()
      .pattern(/[0-9]{11}/)
      .required(),
    cpf: joi
      .string()
      .pattern(/[0-9]{11}/)
      .required(),
    birthday: joi.date().required(),
  });
  const { error } = customersSquema.validate(req.body);
  if (error) {
    res.sendStatus(400);
    return;
  }
  const { rows: cpfQuery } = await connection.query(
    'SELECT * FROM customers WHERE cpf = $1',
    [cpf],
  );
  if (cpfQuery[0]) {
    res.sendStatus(409);
    return;
  }
  await connection.query(
    'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)',
    [name, phone, cpf, birthday],
  );
  res.sendStatus(201);
}
export async function putCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;
  const customersSquema = joi.object({
    name: joi.string().required(),
    phone: joi
      .string()
      .pattern(/[0-9]{11}/)
      .required(),
    cpf: joi
      .string()
      .pattern(/[0-9]{11}/)
      .required(),
    birthday: joi.date().required(),
  });
  const { error } = customersSquema.validate(req.body);
  if (error) {
    res.sendStatus(400);
    return;
  }
  const { rows: cpfQuery } = await connection.query(
    'SELECT * FROM customers WHERE cpf = $1',
    [cpf],
  );
  if (cpfQuery[0]) {
    res.sendStatus(409);
    return;
  }
  await connection.query(
    'UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5k',
    [name, phone, cpf, birthday, id],
  );
  res.sendStatus(200);
}
