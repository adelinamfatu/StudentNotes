const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");

//get all subjects by user
router.get("/:email", async (req, res, next) => {
  try {
    const subjects = await Subject.findAll({ where: { userEmail: req.params.email }});
    res.status(200).json(subjects);
  } catch (error) {
    next(error);
  }
});

//get a subject
router.get("/:id", async (req, res, next) => {
    try {
      const subject = await Subject.findByPk(req.params.id)
      if (subject) {
        res.status(200).json(subject);
      } else {
        return res.status(404).json({error: `Subject with id ${req.params.id} not found`});
      }
    } catch (error) {
      next(error);
    }
});

//add a subject
router.post("/add", async(req, res, next) => {
    try {
      const subject = await Subject.create(req.body);
      res.status(200).json(subject);
    } catch (error) {
      next(error);
    }
});

//update a subject
router.put("/edit/:id", async(req, res, next) => {
    try {
      const subject = await Subject.findByPk(req.params.id);
      if(subject) {
        await subject.update(req.body);
      } else {
        return res.status(404).json({error: `Subject with id ${req.params.id} not found`});
      }
    }catch(error) {
      next(error);
    }
});

//delete a subject
router.delete("/delete/:id", async(req, res, next) =>{
    try {
      const subject = await Subject.findByPk(req.params.id); 
      if (subject) {
        await subject.destroy();
        return res.status(200).json("Subject deleted successfully!");
      } else {
        return res
          .status(404)
          .json({ error: `Subject with id ${req.params.id} not found` });
      }
    } catch (error) {
     next(error);
    }
});

module.exports = router;