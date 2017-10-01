var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));


app.get("/", function(req, res){
        res.render("landing");
});

var adventures = [
	{	name: "Redbrand Hideout",
	 	image: "http://prints.mikeschley.com/img/s/v-3/p568099269-4.jpg"
	},
	{
		name: "Tomb of Diderius",
		image: "http://images.bigcartel.com/product_images/146911894/Tomb_of_Diderius_%28Small%29.jpg?auto=format&fit=max&w=900"
	},
	{
		name: "CragMaw Castle",
		image: "http://prints.mikeschley.com/img/s12/v184/p1040553723-4.jpg"
	}
];


app.get("/adventures", function(req, res){   
    res.render("adventures", {adventures: adventures});
});

app.post("/adventures", function(req, res){
    //res.send("you hit the post route");
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newAdventures = {name: name, image: image};
    adventures.push(newAdventures);
    //redirect back to campgrounds page
    res.redirect("/adventures");
});


app.get("/adventures/new", function(req, res){
    res.render("new");
});


app.listen(3000, function(){
    console.log("Serving site on port 3000");
} );
