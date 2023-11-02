import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("PostList");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("PostList");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    district: req.body.district,
    venue: req.body.venue,
    grade: req.body.grade,
    shuttlecock: req.body.shuttlecock,
    signup: req.body.signup,
  };
  let collection = await db.collection("PostList");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      district: req.body.district,
      venue: req.body.venue,
      grade: req.body.grade,
      shuttlecock: req.body.shuttlecock,
      signup: req.body.signup,
    }
  };

  let collection = await db.collection("PostList");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("PostList");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;