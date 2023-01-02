const express = require("express");
const router = express.Router();
const User = require("../models/user");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
require('dotenv').config()
const auth = require("../middleware/auth");

//get all users
router.get("/", async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
});

//get a user by email
router.get("/:email", auth, async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.email)
      if (user) {
        res.status(200).json(user);
      } else {
        return res.status(404).json({error: `User with email ${req.params.email} not found`});
      }
    } catch (error) {
      next(error);
    }
});

//add a user
router.post("/add", async(req, res, next) => {
    try {
      const { email, hashPassword, name, surname, faculty, field } = req.body;
      encryptedPassword = await bcrypt.hash(hashPassword, 10);
      
      const user = await User.create({
        email, 
        hashPassword: encryptedPassword,
        name,
        surname,
        faculty,
        field
      });

      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
      
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
});

router.post("/login", async (req, res) => 
{
  try 
  {
    const { email, hashPassword } = req.body;
    console.log("Parola: ", hashPassword);

    if (!(email && hashPassword)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findByPk(email);

    if (user && (await bcrypt.compare(hashPassword, String(user.hashPassword)))) 
    {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json({user});
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

//update a user
router.put("/edit/:email", async(req, res, next) => {
    try {
      const user = await User.findByPk(req.params.email);
      if(user) {
        await user.update(req.body);
      } else {
        return res.status(404).json({error: `User with email ${req.params.email} not found`});
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