import dayjs from 'dayjs';
import joi from 'joi';
import connection from '../db.js';

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  if (customerId && gameId) {
    const { rows } = await connection.query(
      `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
      FROM rentals 
      JOIN customers 
      ON customers.id = $1
      JOIN games
      ON games.id = $2
      JOIN categories
      ON categories.id = games."categoryId"`,
      [customerId, gameId],
    );
    res.status(200).send(rows);
    return;
  } else if (customerId) {
    const { rows } = await connection.query(
      `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer
      FROM rentals 
      JOIN customers 
      ON customers.id = $1`,
      [customerId],
    );
    res.status(200).send(rows);
    return;
  } else if (gameId) {
    const { rows } = await connection.query(
      `SELECT rentals.*, json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
      FROM rentals 
      JOIN games
      ON games.id = $1
      JOIN categories
      ON categories.id = games."categoryId"`,
      [gameId],
    );
    res.status(200).send(rows);
    return;
  } else {
    const { rows } = await connection.query('SELECT * FROM rentals');
    res.status(200).send(rows);
    return;
  }
}
export async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  let infos;
  const rentalsSquema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().min(1).required(),
  });
  const { error } = rentalsSquema.validate(req.body);
  if (error) {
    res.sendStatus(400);
    return;
  }
  const { rows: queryCustomersAndGames } = await connection.query(
    `SELECT customers.id AS "customerId", games.* FROM customers
  JOIN games
  ON games.id = $1
  WHERE customers.id = $2`,
    [gameId, customerId],
  );

  // prices/date stuffs
  const price = queryCustomersAndGames[0].pricePerDay * daysRented;
  const dateNow = dayjs().locale('pt-br').format('YYYY-MM-DD');

  if (!queryCustomersAndGames[0]) {
    res.sendStatus(400);
    return;
  }
  await connection.query(
    `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
  VALUES ($1, $2, $3, $4, null, $5, null)`,
    [customerId, gameId, dateNow, daysRented, price],
  );
  res.sendStatus(201);
}
export async function returnRentals(req, res) {
  const { id } = req.params;
  const { rows: queryRentals } = await connection.query(
    'SELECT * FROM rentals WHERE id = $1',
    [id],
  );
  if (!queryRentals[0]) {
    res.sendStatus(404);
    return;
  }
  if (queryRentals[0].returnDate) {
    res.sendStatus(400);
    return;
  }

  // Price/Date Stuff
  const dayToReturn = dayjs(queryRentals[0].rentDate).add(
    queryRentals[0].daysRented,
    'day',
  );
  const pricePerDay =
    queryRentals[0].originalPrice / queryRentals[0].daysRented;
  const nowDate = dayjs().locale('pt-br');
  const formattedNowDate = dayjs().locale('pt-br').format('YYYY-MM-DD');
  const differenceDays = nowDate.diff(dayToReturn, 'days');
  const delayFee = pricePerDay * differenceDays;

  await connection.query(
    `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
    [formattedNowDate, delayFee, id],
  );
  res.sendStatus(200);
}
export async function deleteRentals(req, res) {
  console.log('delete funcionando');
}
