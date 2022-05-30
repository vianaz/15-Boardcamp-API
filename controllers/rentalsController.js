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
  console.log('post funcionando');
}
export async function deleteRentals(req, res) {
  console.log('delete funcionando');
}
