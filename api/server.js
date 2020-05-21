const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.json(accounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "error retreiving posts" });
  }
});

server.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const account = await db.select("*").from("accounts").where({ id }).first();
    if (account) {
      res.status(200).json(account);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Error Retieving Posts" });
  }
});

server.post("/", async (req, res) => {
  const postData = req.body;

  try {
    const post = await db.insert(postData).into("accounts");
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error Connecting to DB" });
  }
});

server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const newPost = await db("accounts").where({ id }).update(changes);
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Issue Accessing DB" });
  }
});

server.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.del().from("accounts").where({ id });
    res.status(200).json(id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error Accessing the database" });
  }
});

module.exports = server;
