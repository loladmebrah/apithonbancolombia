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
	return data;
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