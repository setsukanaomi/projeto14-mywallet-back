import { db } from "../database/database.connection.js";

export async function transaction(req, res) {
  const { tipo } = req.params;
  const { value, description } = req.body;
  const user = req.locals.user;

  if (tipo !== "entrada" && tipo !== "saida") {
    return res.sendStatus(400);
  }

  try {
    const transaction = {
      userId: user.userId,
      type: tipo,
      value,
      description,
    };

    await db.collection("transactions").insertOne(transaction);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function listUserTransactions(req, res) {
  const user = req.locals.user;

  try {
    const transactions = await db
      .collection("transactions")
      .find({ $or: [{ userId: user.userId }] })
      .toArray();

    res.send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
