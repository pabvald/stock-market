import express from "express";
import { Worker } from "worker_threads";
import { db } from "./db";
let app = express();
let server = require("http").Server(app);
const session = require("express-session");
const nodeMailer = require('nodemailer');

import { echo, ping } from './controllers/echo';
import { getPortfolioSummary, getHistory, sellActions } from "./controllers/portfolio";
import { getUserGroups } from "./controllers/groups";
import {getAllChallenges,createChallenge,getChallengeUsers,addUserToChallenge, getChallengeInfo,removeUserFromChallenge} from './controllers/challenge';
import { getUserInformation } from "./controllers/userinfo";
import { login, register, logout } from "./controllers/login";
import { sendContactEmail, sendRecoverPasswordEmail, sendRegisterConfirmationEmail } from "./controllers/contact";
import { buyStocks } from "./controllers/buy";
import { getCompanyEvolution, getMarket } from "./controllers/companies";
import { checkPassword, updateName, updateBio, updatePic } from "./controllers/update";
import { getPriceEvolution, getMarket, getIndicatorEvolution } from "./controllers/companies";

app.use(express.json());

app.use(express.static(__dirname + "/../../angular/dist"));

app.use(session({
	secret: "TuringCompleto",
	resave: false,
	saveUninitialized: true
}));

app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb'}));

app.get("/api/echo",echo);
app.get("/api/ping",ping);
app.get("/api/portfolio/:nickname",getPortfolioSummary);

app.get("/api/user/groups/:nickname", getUserGroups);
app.get("/api/user/information/:nickname", getUserInformation);
app.post("/api/user/checkpass", checkPassword);
app.post("/api/user/updatename", updateName);
app.post("/api/user/updatebio", updateBio);
app.post("/api/user/updatepic", updatePic);

app.get("/api/portfolio/history/:nickname",getHistory);
app.get("/api/user/groups:nickname", getUserGroups);
app.get("/api/market/evolution/:code", getPriceEvolution);
app.get("/api/market/ind/:code/:indicator", getIndicatorEvolution);
app.get("/api/market/companies", getMarket);
app.get("/api/challenges",getAllChallenges);
app.post("/api/createChallenge",createChallenge);
app.get("/api/challenge/:id",getChallengeUsers);
app.post("/api/challenge/addUser",addUserToChallenge);
app.post("/api/challenge/removeUser",removeUserFromChallenge);
app.get("/api/challengeData/:id",getChallengeInfo);


app.post("/api/portfolio/sell",sellActions);
app.post("/api/login",login);
app.post("/api/register",register);
app.post("/api/market/buy", buyStocks);
app.post("/api/contact", sendContactEmail);
app.post("/api/recoverpassword", sendRecoverPasswordEmail);
app.post("/api/registerconfirmation", sendRegisterConfirmationEmail);
app.post("/api/logout",logout);

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
