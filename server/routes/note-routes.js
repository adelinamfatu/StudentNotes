const express = require("express");
const router = express.Router();
const Note = require("../models/note");

//get all notes by user
router.get("/:email", async (req, res, next) => {
    try {
      const notes = await Notes.findAll({ where: { userEmail: req.params.email }});
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
});

//get a note
router.get("/:id", async (req, res, next) => {
    try {
      const note = await Note.findByPk(req.params.id)
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

//delete a note
router.delete("/delete/:id", async(req, res, next) =>{
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