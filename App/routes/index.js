const express = require('express');
const User = require('./../models/User');
const router = express.Router();

module.exports = () => {
  router.get("/", (req,res)=>{
    res.send("hello")
  })
  router.get("/users", async (req, res) => {
    const users = await User.find();
    try {
      if (!users) {
        res.status(401).send("users not found")
      }
      res.status(200).send(users)
    } catch (err) {
      res.status(500).send(err)
    }
  })
  router.post("/add", async(req, res) => {
    try {
      const {firstName,lastName,email,age } =
        req.body;
      if (
        !(firstName && lastName && email && age)
      ){
        return res.status(400).send("all input are required");
      }

    // check if user already exists
    // const UserExist = await User.findOne({ email });
    // if (UserExist) {
    //   return res.status(409).send("user already exists ,Please login");
    // }


    // saving our new created
    const saveNewUser = await User.create({
      firstName, lastName,email,age 
    });

    res.status(201).send(saveNewUser);

    } catch (err) {
      res.status(500).send(err)
    }

  })

  router.put("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { firstName, lastName } = req.body
        // check if user exist
        const user = await User.findById({ _id: id })
        if (!user) {
            res.status(401).send("user not found");
  
        }
         const userUpdated=user.set({ firstName, lastName });
         userUpdated.save();
        res.send(userUpdated);
    } catch (err) {
        res.status(500).send(err);
    }
  });
  router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // check if user exist
        const user = await User.findById({ _id: id })
        if (!user) {
            res.status(401).send("user not found");
        }
        await User.deleteOne({ _id: id });
        res.status(200).send("user deleted");
    } catch (err) {
        res.status(500).send(err);
    }
  });
  





  return router
}


