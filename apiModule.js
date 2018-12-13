const EventEmmitter = require('events');
const util = require('util');
const request =  require('request');
const examples = require('./examples.js');

var innerSocket = new EventEmmitter();
var auctionData = [ {"name":"Jorge", "amount":100000000, "risk": "high"},
				  	{"name":"Leonardo", "amount":300000000, "risk": "low"},
				  	{"name":"Alfredo", "amount":400000000, "risk": "medium"},
				  	{"name":"Jorge", "amount":100000000, "risk": "medium"},
				  	{"name":"Leonardo", "amount":300000000, "risk": "low"},
				  	{"name":"Alfredo", "amount":400000000, "risk": "medium"}, 
				  	{"name":"Jorge", "amount":100000000, "risk": "high"},
				  	{"name":"Leonardo", "amount":300000000, "risk": "medium"},
				  	{"name":"Alfredo", "amount":400000000, "risk": "medium"},
				  ]

var aucData =  [
	{id: 100, funds: 5000, debt: 3000, type: "debtor", score: 0.5, rate: 12, max_rate: 9, min_rate: 6, periods: 8, still: 3, assessment: 225},
	{id: 101, funds: 2000, debt: 5000, type: "debtor", score: 0.35, rate: 11, max_rate: 8, min_rate: 5, periods: 8, still: 3, assessment: 225},
	{id: 102, funds: 8000, debt: 8000, type: "debtor", score: 0.45, rate: 15, max_rate: 12, min_rate: 9, periods: 8, still: 3, assessment: 225},
	{id: 103, funds: 2000, debt: 3000, type: "debtor", score: 0.95, rate: 13, max_rate: 10, min_rate: 7, periods: 8, still: 3, assessment: 225},
	{id: 104, funds: 5000, debt: 5000, type: "debtor", score: 0.85, rate: 10, max_rate: 7, min_rate: 4, periods: 8, still: 3, assessment: 225},
	{id: 105, funds: 5000, debt: 0, type: "investor", debt_value: 2000, cut_rate: 0.7, cuote_value: 200},
	{id: 106, funds: 6000, debt: 8000, type: "debtor", score: 0.9, rate: 12, max_rate: 9, min_rate: 6, periods: 8, still: 3, assessment: 225},
	{id: 107, funds: 11000, debt: 0, type: "investor", debt_value: 2000, cut_rate: 0.7, cuote_value: 200}
];


innerSocket.on('AUTH', function(client_id,client_secret,catalog,redirect_uri,scope,response_type){
   let t = getToken(client_id,client_secret,catalog,redirect_uri,scope,response_type);
   innerSocket.emit('TOKEN', t);
});

innerSocket.on('GETCLIENTINFO', function(id){
    innerSocket.emit('CLIENTINFO', getClientData(id));
});


innerSocket.on('MAKEPAYMENT', function(){
    
});


innerSocket.on('GETAUCTIONINFO', function(risk){
	innerSocket.emit('AUCTIONINFO', getAuctionData(risk));
});

function getAuctionData(risk){
	let data = [];
	for (var i = 0; i < auctionData.length; i++) {
		if(auctionData[i].risk == risk)
			data.push(auctionData[i]);
	}
	return aucData;
}


function getClientData(id){
	client = examples.getClient;
	client.id = id;
	return client;
}

function getToken(client_id,client_secret,catalog,redirect_uri,scope,response_type){
	
}

function getEmitter(){ return innerSocket; }

module.exports = {
    emitter : getEmitter()
}