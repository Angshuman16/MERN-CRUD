const express = require('express');
const app = express();
const cors= require('cors');

const mongoose = require('mongoose');
const FriendModel = require('./models/friends');

app.use(cors());

app.use(express.json());


// Database Connection
mongoose.connect("mongodb://0.0.0.0:27017/MERN-CRUD?readPreference=primary&appname=MongoDB%20Compass&ssl=false",{
   
});

// app.get("/insert", async (req, res) => {
//   const friend = new FriendModel({ name: "Abhi", age: 21 });
//   await friend.save();
//   res.send("Inserted Data");
// });

app.post("/addfriend",async (req,res) =>{
  const name=req.body.name;
  const age=req.body.age;
  const friend = new FriendModel({ name: name, age: age });
  await friend.save();
  res.send("Success");
});


app.get("/read", async (req, res) => {
  try {
    const result = await FriendModel.find({}).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/update", async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;

  try {
    const friendToUpdate = await FriendModel.findById(id);

    if (!friendToUpdate) {
      return res.status(404).send("Friend not found");
    }

    friendToUpdate.age = Number(newAge);
    await friendToUpdate.save();

    
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
  res.send("Updated");
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await FriendModel.findByIdAndDelete(id);
    if (result) {
      res.send("Deleted Successfully");
    } else {
      // If no document found with the given id
      res.status(404).send("Document not found");
    }
  } catch (error) {
    // Handle possible errors
    res.status(500).send(error.message);
  }
});



app.listen(3001, () => {
  console.log("You are Connected");
});
