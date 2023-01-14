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

module.exports = router;