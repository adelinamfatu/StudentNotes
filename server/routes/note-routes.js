const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const Subject = require("../models/subject");

//get all notes by user
router.get("/:email", async (req, res, next) => {
    try {
      const notes = await Note.findAll(
        { where: [{ userEmail: req.params.email }],
        include: [{
          model: Subject,
          as: 'subject',
          attributes: ['title', 'tag'],
          required: true
        }]
      });
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
});

//get all notes by subject
router.get("/subjects/:id", async (req, res, next) => {
  try {
    const notes = await Note.findAll(
      { where: [{ subjectId: req.params.id }],
      include: [{
        model: Subject,
        as: 'subject',
        attributes: ['title', 'tag'],
        required: true
      }]
    });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

//get a note
router.get("/id/:id", async (req, res, next) => {
    try {
      const note = await Note.findByPk(req.params.id, {
        include: [{
          model: Subject,
          as: 'subject',
          attributes: ['title', 'tag'],
          required: true
        }]
      });
      if (note) {
        res.status(200).json(note);
      } else {
        return res.status(404).json({error: `Note with id ${req.params.id} not found`});
      }
    } catch (error) {
      next(error);
    }
});

//add a note
router.post("/add", async(req, res, next) => {
    try {
      const note = await Note.create(req.body);
      res.status(200).json(note);
    } catch (error) {
      next(error);
    }
});

//update a note
router.put("/edit/:id", async(req, res, next) => {
    try {
      const note = await Note.findByPk(req.params.id);
      if(note) {
        await note.update(req.body);
      } else {
        return res.status(404).json({error: `Note with id ${req.params.id} not found`});
      }
    }catch(error) {
      next(error);
    }
});

//delete a note by id
router.delete("/remove/:id", async(req, res, next) =>{
    try {
      const note = await Note.findByPk(req.params.id); 
      if (note) {
        await note.destroy();
        return res.status(200).json("Note deleted successfully!");
      } else {
        return res
          .status(404)
          .json({ error: `Note with id ${req.params.id} not found` });
      }
    } catch (error) {
     next(error);
    }
});

module.exports = router;