const EventEmmitter = require('events');
const util = require('util');
const request =  require('request');
const examples = require('./examples.js');

var innerSocket = new EventEmmitter();

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
	return examples.getAccounts;
}

function getClientData(id){
	let clients = examples.getClient;
	for (var i = 0; i < clients.length; i++) {
		if(clients[i].id == id)
			return clients[i]; 
	}
	return {"Msg":"Error, no client"};
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