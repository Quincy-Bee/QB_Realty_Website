import express from "express";
import db from "../db/conn.js";
import mongoose from "mongoose";
import student_grades from "../db/grades.js";
const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  let newDocument = req.body;

  // rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  let result = await student_grades.create(newDocument);
  res.send(result).status(204);
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  let result = await student_grades.findById(req.params.id);


  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {

  let result = await student_grades.updateOne(req.params.id, {
    $push: { scores: req.body }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {



  let result = await student_grades.updateOne(req.params.id, {
    $pull: { scores: req.body }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {

  let result = await student_id.deleteOne(req.params.id);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get route for backwards compatibility
router.get("/student/:id", async (req, res) => {
  res.redirect(`learner/${req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {

  
  // Check for class_id parameter
  if (req.params.id) student_grades.class_id = Number(req.params.id);

  let result = await student_grades.find(req.params.id).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {


  let result = await student_grades.deleteOne(req.params.id);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {


  // Check for learner_id parameter
  if (req.params.id) student_grades.learner_id = Number(req.params.id);

  let result = await student_grades.find(req.params.id).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  

  let result = await student_grades.updateMany(req.params.id, {
    $set: { class_id: req.body.class_id }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a class
router.delete("/class/:id", async (req, res) => {


  let result = await student_grades.deleteMany(req.params.id);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;
