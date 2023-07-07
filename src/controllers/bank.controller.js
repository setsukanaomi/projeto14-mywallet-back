import { db } from "../database/database.connection.js";

export async function transaction(req, res) {
  const { tipo } = req.params;
  const { value, description } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (tipo !== "entrada" && tipo !== "saida") {
    return res.sendStatus(400);
  }

  if (!token) return res.sendStatus(401);

  try {
    const user = await db.collection("sessions").findOne({ token });
    if (!user) res.sendStatus(401);

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

export async function listUserTransactions(req, res) {}
