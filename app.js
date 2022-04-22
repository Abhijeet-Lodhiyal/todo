//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema=new mongoose.Schema({
  name:String
});
const Item=mongoose.model("Item",itemSchema);


const buy=new Item({
  name:"Buy Stuff"
});

const drink=new Item({
  name:"Drink Wataaaa"
});

const walk=new Item({
  name:"Walk you lazy person"
});


const defaultItem=[buy,drink,walk];





app.get("/", function(req, res) {
const day = date.getDate();

Item.find(function(err,results){

  if(results.length === 0)
  {
    Item.insertMany(defaultItem,function(err){
  if(err)
  console.log(err);
  else
  console.log("Successfully inserted");
});
  }
  res.render("list", {listTitle: day, newListItems: results});
});

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const newItem=new Item({
    name:itemName,
  });
  newItem.save();
  res.redirect("/");

});

app.get("/:customName",function(req,res){
const pageName=req.params.customName;
const customSchema=new mongoose.Schema({
  name:pageName,
  list:[defaultItem]
});
const newItem=mongoose.model(pageName,customSchema);

res.render("list",{listTitle:pageName,newListItems:defaultItem});
});



app.post("/delete",function(req,res){
const id=req.body.checkbox;
Item.findByIdAndRemove(id,function(err)
{
  if(!err)
  {
    res.redirect("/");
  }
});

});


app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
