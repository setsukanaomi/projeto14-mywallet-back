import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function transaction(req, res) {
  const { tipo } = req.params;
  const { value, description } = req.body;
  const user = res.locals.user;

  if (tipo !== "entrada" && tipo !== "saida") {
    return res.sendStatus(400);
  }

  try {
    const transaction = {
      userId: user._id,
      type: tipo,
      date: dayjs().format("DD/MM"),
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
  const user = res.locals.user;

  try {
    const transactions = await db
      .collection("transactions")
      .find({ $or: [{ userId: user._id }] })
      .toArray();

    res.send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
