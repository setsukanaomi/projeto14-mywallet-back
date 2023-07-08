import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signup(req, res) {
  const { name, email, password } = req.body;

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
    if (!user) return res.sendStatus(404);

    const correctPassword = bcrypt.compareSync(password, user.password);
    if (!correctPassword) return res.sendStatus(401);

    const token = uuid();
    const data = {
      token: token,
      name: user.name,
    };
    await db.collection("sessions").deleteMany({ userId: user._id });
    await db.collection("sessions").insertOne({ token, userId: user._id });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
