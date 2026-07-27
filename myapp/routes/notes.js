var express = require('express');
var router = express.Router();
const cors = require('cors'); // corsミドルウェアを追加
require('dotenv').config(); // .envファイルを読み込む

const { MongoClient } = require("mongodb");

// ★ちゃんとしたURIにする（自分のやつに置き換え）
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

router.get('/', async (req, res) => {
  try {
    await connectDB();

    const database = client.db('notes');
    const notes = database.collection('notes');

    

    const note = await notes.find().toArray(); // ★重要

    res.json(note);

  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

module.exports = router;