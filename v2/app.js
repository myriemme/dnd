var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dnd", {
	useMongoClient: true
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));

//Schema setup
var adventureSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Adventure = mongoose.model("Adventure", adventureSchema);

//******************************
//ROUTES
//******************************

//ROOT ROUTE
app.get("/", function (req, res) {
	res.render("landing");
});

//INDEX - show all adventures
app.get("/adventures", function (req, res) {
	//Get all adventures from DB
	Adventure.find({}, function (err, allAdventures) {
		if (err || !allAdventures) {
			console.log(err);
		} else {
			res.render("index", {
				adventures: allAdventures
			});
		}
	});
});

//CREATE - add new adventure to DB
app.post("/adventures", function (req, res) {
	//res.send("you hit the post route");
	//get data from form and add to ADVENTURE array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newAdventure = {
		name: name,
		image: image,
		description: description
	};
	//Create a new adventure and save to DB
	Adventure.create(newAdventure, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} //redirect back to ADVENTURE page
		else {
			res.redirect("/adventures");
		}
	});
});

//NEW - show form to create new adventure
app.get("/adventures/new", function (req, res) {
	res.render("new");
});

//SHOW - shows more info about one campground
app.get("/adventures/:id", function(req, res){
	//find the adventures with provided ID
	Adventure.findById(req.params.id, function(err, foundAdventure){
		if(err){
			console.log(err);
		} else {
			res.render("show", {adventure: foundAdventure});
		}
	});
});

app.listen(3000, function () {
	console.log("Serving site on port 3000");
});
