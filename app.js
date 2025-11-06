//jshint esversion:6

// Load environment variables from .env file (if dotenv is installed)
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not installed, use system environment variables
  console.log("Note: dotenv not installed. Using system environment variables.");
}

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Mi smo kancelarija 423 N, vesela, imamo kuma i baš nas briga ;-)";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// MongoDB connection - environment variables (required)
const mongoUsername = process.env.MONGODB_USERNAME;
const mongoPassword = process.env.MONGODB_PASSWORD || process.env.PASS;
const mongoCluster = process.env.MONGODB_CLUSTER;
const mongoDatabase = process.env.MONGODB_DATABASE;

// Check if all required environment variables are provided
if (!mongoUsername) {
  console.error("ERROR: MONGODB_USERNAME environment variable is required!");
  process.exit(1);
}

if (!mongoPassword) {
  console.error("ERROR: MONGODB_PASSWORD or PASS environment variable is required!");
  process.exit(1);
}

if (!mongoCluster) {
  console.error("ERROR: MONGODB_CLUSTER environment variable is required!");
  process.exit(1);
}

if (!mongoDatabase) {
  console.error("ERROR: MONGODB_DATABASE environment variable is required!");
  process.exit(1);
}

const putanja = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoCluster}/${mongoDatabase}`;
mongoose.connect(putanja);

const postSchema = {
  title: String,
  content: String
  
  };
const Post = mongoose.model("Post", postSchema);



/* const post = new Post({
  name: "PERA"
});

post.save(); */



let posts = [];

app.get("/", function(req, res){
  
    Post.find({}, function(err, posts){
      console.log(posts[0])

      res.render("home", {
   
        startingContent: homeStartingContent,
   
        posts: posts
   
        });
      });

    
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  /* posts.push(post); */

  
  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });

  /* res.redirect("/"); */

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
console.log(req.params.postName);



/* ***************************resenje kada se iz home.ejs uzima <a href="/posts/<%=post._id%>">Read More</a> ************************************************************************** */


Post.findOne({_id: req.params.postName}, (err, post) => {
  res.render("post", {
    title: post.title,
    content: post.content
  });


} );
  
/* ***************************resenje kada se iz home.ejs uzima <a href="/posts/<%=post.title%>">Read More</a> ************************************************************************** */

/* Post.findOne({ title: req.params.postName },  function (err, foundList) {
  console.log(foundList.title + " foundList.title")
 const listName = _.lowerCase(foundList.title)
 res.render("post", {
  title: foundList.title,
  content: foundList.content
}); */



});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
