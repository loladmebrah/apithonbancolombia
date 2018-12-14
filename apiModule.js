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

innerSocket.on('GETACTUAL', function(){
	innerSocket.emit('ACTUALINFO', examples.getActualAccount);
});

innerSocket.on('GETAUCTIONS', function(){
	innerSocket.emit('AUCTIONS', findAuctions(examples.getAuctions, examples.getActualAccount));
});

innerSocket.on('PARTICIPATE', function(info){
	innerSocket.emit('AUCTIONS', findAuctions(updateAuction(info), examples.getActualAccount));
});

innerSocket.on('NEXTACCOUNT', function(info){
	innerSocket.emit('ACTUALINFO', next(info.tabu));
});

innerSocket.on('GETCLOSEDAUCTIONS', function(){
	innerSocket.emit('AUCTIONS', findClosedAuctions(examples.getAuctions, examples.getActualAccount));
});

function findClosedAuctions(auctions, actual) {
	var result = [];
	for (var i = 0; i < auctions.length; i++)
		for (var j = 0; j < auctions[i].participants.length; j++)
			if (auctions[i].participants[j].id == actual.id && auctions[i].status === "closed")
				result.push(auctions[i]);
	return result;
}

function next(tabu) {
	examples.getActualAccountIndex = (examples.getActualAccountIndex + 1) % examples.getAccounts.length;
	examples.getActualAccount = examples.getAccounts[examples.getActualAccountIndex];
	while (examples.getActualAccount.type === tabu) {
		examples.getActualAccountIndex = (examples.getActualAccountIndex + 1) % examples.getAccounts.length;
		examples.getActualAccount = examples.getAccounts[examples.getActualAccountIndex];
	}
	return examples.getActualAccount;
}

function updateAuction(info) {
	for (var i = 0; i < examples.getAuctions.length; i++) {
		if (examples.getAuctions[i].debtor.id == info.id) {
			examples.getAuctions[i].participants.push(examples.getActualAccount);
			examples.getAuctions[i].offer.push({amount: info.amount, rate: info.rate});
			if (examples.getAuctions[i].participants.length >= 3) {
				examples.getAuctions[i].status = "closed";
				// quemado auctions
				var monto = 60327080;
				examples.getAuctions[i].results.push({cuote: 870636.4, percentage: 0.66, amount: monto * 0.66});
				examples.getAuctions[i].results.push({cuote: 448509.66, percentage: 0.34, amount: monto * 0.34 });
				examples.getAuctions[i].results.push({cuote: 0, percentage: 0});
				// quemado accounts
				examples.getAuctions[i].rate = 8.5;
				examples.getAuctions[i].debtor.rate = 9.5;
				examples.getAuctions[i].debtor.cuote = 1332477;
				for (var j = 0; j < examples.getAuctions[i].participants.length; j++)
					if (examples.getAuctions[i].results[j].percentage > 0)
						examples.getAuctions[i].participants[j].funds -= examples.getAuctions[i].results[j].amount;
			}
		}
	}
	return examples.getAuctions;
}

function findAuctions(auctions, actual) {
	var result = [];
	for (var i = 0; i < auctions.length; i++)
		for (var j = 0; j < auctions[i].participants.length; j++)
			if (auctions[i].participants[j].id == actual.id && auctions[i].status === "open")
				result.push(auctions[i].debtor.id);
	return result;
}

function getAuctionData(risk){
	accounts = filter("debtor", examples.getAccounts, examples.getAuctions);
	return accounts;
}

function filter(type, accounts, auctions) {
	var accs = [];
	for (var i = 0; i < accounts.length; i++)
		if (accounts[i].type === type && auctions[i].status === "open")
			accs.push(accounts[i]);
	return accs;
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