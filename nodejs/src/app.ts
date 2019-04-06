import express from "express";
import { Worker } from "worker_threads";
let app = express();
let server = require("http").Server(app);
const bodyParser = require("body-parser");

import { echo, get_users } from './controllers/echo';
import { getPortfolioSummary } from "./controllers/portfolio";
import { getUserGroups } from "./controllers/groups";
import {getAllChallenges,createChallenge} from './controllers/challenge';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/../../angular/dist"));

app.get("/api/echo",echo);
app.get("/api/list_users",get_users);
app.get("/api/portfolio/:nickname",getPortfolioSummary);
app.get("/api/user/groups:nickname", getUserGroups);
app.get("/api/challenges",getAllChallenges);
app.post("/api/createChallenge",createChallenge);

app.get("/*",function(req,res){
	res.sendFile("index.html",{root: __dirname + "/../../angular/dist"});
});



server.listen(process.env.PORT || 9999, function(){
	console.log("Server OK. Listening on: "+(process.env.PORT || 9999));
});

let worker = new Worker(__dirname + "/data/index.js");
worker.on("online",()=>{
	console.log("Data worker started OK");
});