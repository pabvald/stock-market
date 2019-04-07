import express from "express";
import { Worker } from "worker_threads";
let app = express();
let server = require("http").Server(app);
const bodyParser = require("body-parser");
const session = require("express-session");
const nodeMailer = require('nodemailer');

import { echo, ping } from './controllers/echo';
import { getPortfolioSummary, getHistory, sellActions } from "./controllers/portfolio";
import { getUserGroups } from "./controllers/groups";
import { login, register } from "./controllers/login";
import { sendEmail } from "./controllers/contact";
import { buyStocks } from "./controllers/buy";
import { getCompanyEvolution, getMarket } from "./controllers/companies";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/../../angular/dist"));

app.use(session({
	secret: "TuringCompleto",
	resave: false,
	saveUninitialized: true
}));

app.get("/api/echo",echo);
app.get("/api/ping",ping);
app.get("/api/portfolio/:nickname",getPortfolioSummary);
app.get("/api/portfolio/history/:nickname",getHistory);
app.get("/api/user/groups:nickname", getUserGroups);
app.get("/api/market/evolution/:code", getCompanyEvolution);
app.get("/api/market/companies", getMarket);

app.post("/api/portfolio/sell",sellActions);
app.post("/api/login",login);
app.post("/api/register",register);
app.post("/api/market/buy", buyStocks);
app.post("/api/contact", sendEmail);


/* CORS THING */
app.options("/*",(req,res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendStatus(200);
});

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