const express = require("express");
const router = express.Router();
const User = require("../models/user");

//get all users
router.get("/", async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
});

//get a user
router.get("/:id", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id)
      if (user) {
        res.status(200).json(user);
      } else {
        return res.status(404).json({error: `User with id ${req.params.id} not found`});
      }
    } catch (error) {
      next(error);
    }
});

//add a user
router.post("/add", async(req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
});

//update a user
router.put("/edit/:id", async(req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id);
      if(user) {
        await user.update(req.body);
      } else {
        return res.status(404).json({error: `User with id ${req.params.id} not found`});
      }
    }catch(error) {
      next(error);
    }
});

//delete a user
router.delete("/delete/:id", async(req, res, next) =>{
    try {
      const user = await User.findByPk(req.params.id); 
      if (user) {
        await user.destroy();
        return res.status(200).json("User deleted successfully!");
      } else {
        return res
          .status(404)
          .json({ error: `User with id ${req.params.id} not found` });
      }
    } catch (err) {
     next(err);
    }
});

module.exports = router;