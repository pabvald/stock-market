import express from "express";
let app = express();
let server = require("http").Server(app);
const bodyParser = require("body-parser");

import { echo, get_users } from './controllers/echo';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/../../angular/dist"));

app.get("/api/echo",echo);
app.get("/api/list_users",get_users);

app.get("/*",function(req,res){
	res.sendFile("index.html",{root: __dirname + "/../../angular/dist"});
});



server.listen(process.env.PORT || 9999, function(){
	console.log("Server OK. Listening on: "+(process.env.PORT || 9999));
});