import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function signup(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  const hash = bcrypt.hashSync(password, 10);
  try {
    const emailExists = await db.collection("users").findOne({ email });
    if (emailExists) return res.sendStatus(409);
    await db.collection("users").insertOne({ name, email, password: hash });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
