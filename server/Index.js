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


app.listen(3001, () => {
  console.log("You are Connected");
});
