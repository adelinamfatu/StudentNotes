const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const GroupUser = require("../models/groupuser");
const GroupNote = require("../models/groupnote");

//get all groups by user
router.get("/:email", async (req, res, next) => {
    try {
      const groupuser = await GroupUser.findAll(
        { where: [{ userEmail: req.params.email }],
        include: [{
          model: Group,
          as: 'group',
          attributes: ['name', 'id'],
          required: true
        }]
      });
      res.status(200).json(groupuser);
    } catch (error) {
      next(error);
    }
});

//add a group
router.post("/add", async(req, res, next) => {
    try {
      const group = await Group.create(req.body);
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
});

//add group user
router.post("/add/user", async(req, res, next) => {
    try {
      const groupuser = await GroupUser.create(req.body);
      res.status(200).json(groupuser);
    } catch (error) {
      next(error);
    }
});

//add group note
router.post("/add/note", async(req, res, next) => {
    try {
      const groupnote = await GroupNote.create(req.body);
      res.status(200).json(groupnote);
    } catch (error) {
      next(error);
    }
});

//delete group notes
router.delete("/remove/note/:id", async(req, res, next) =>{
  try {
    const groupnotes = await GroupNote.findAll({ where: { noteId: req.params.id} }); 
    if (groupnotes) {
      await GroupNote.destroy({ where: { noteId: req.params.id} });
      return res.status(200).json("Group notes deleted successfully!");
    } else {
      return res
        .status(404)
        .json({ error: `Notes with id ${req.params.id} not found` });
    }
  } catch (error) {
   next(error);
  }
});

//remove group notes
router.delete("/remove/:email/:groupId", async(req, res, next) =>{
  try {
    const groupuser = await GroupUser.findAll({ where: { userEmail: req.params.email,
      groupId: req.params.groupId} }); 
    if (groupuser) {
      await GroupUser.destroy({ where: { userEmail: req.params.email,
        groupId: req.params.groupId} });
      return res.status(200).json("Group user deleted successfully!");
    } else {
      return res
        .status(404)
        .json({ error: `Group with id ${req.params.groupId} not found` });
    }
  } catch (error) {
   next(error);
  }
});

module.exports = router;