//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");
const _ = require("lodash");
const { listen } = require("express/lib/application");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://abhijeetlodhiyalALO:komedymatKRO5@cluster0.35oj1.mongodb.net/todolistDB");

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

  const pageName=req.body.list;
  const newItem=new Item({
    name:itemName,
  });

if(pageName === date.getDate())
{
  newItem.save();
  res.redirect("/");
}
else{
List.findOne({name:pageName},function(err,foundList){
  if(!err)
  {

foundList.items.push(newItem);
foundList.save();
res.redirect("/"+pageName);
}
});  

}


});

const customSchema=new mongoose.Schema({
  name:String,
  items:[itemSchema]
});
const List=mongoose.model("List",customSchema);




app.get("/:customName",function(req,res){
const pageName=_.capitalize(req.params.customName);

List.findOne({name:pageName},function(err,foundList){
  if(!err)
  {
    if(!foundList)
    {
      const newItemObj=new List({
        name:pageName,
        items:defaultItem
      });
      newItemObj.save();
      res.redirect("/"+pageName);
    }
    else
    {
      res.render("list",{listTitle:foundList.name,newListItems:foundList.items});
    }
  }
});
});



app.post("/delete",function(req,res)
{
const id=req.body.checkbox;
const pageName=req.body.listName;
if(pageName === date.getDate())
{
  Item.findByIdAndRemove(id,function(err)
  {
    if(!err)
    {
      res.redirect("/");
    }
  });
}
else
{
  List.findOneAndUpdate({name:pageName},{$pull : {items : {_id : id }}},function (err) {
    if(!err)
    {
      res.redirect("/"+pageName);
    }
  });
}


});
app.get("/about", function(req, res){
  res.render("about");
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
