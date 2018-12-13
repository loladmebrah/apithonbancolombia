const fs = require('fs');
const util = require('util');
const EventEmmitter = require('events');
const apiController = require('./apiModule.js');
const appDeployer = require('./appDeployer.js');

const viewEmitter = appDeployer.emitter;
const apiEmitter =  apiController.emitter;

//console.log(viewEmitter);
//console.log(apiEmitter);
//console.log(apiEmitter);
/*
	EVENTOS DISPONIBLES:
	Solicitud:
		AUTH
		GETCLIENTINFO
		MAKEPAYMENT
		GETAUCTIONINFO

	Respuesta:
		AUCTIONINFO
		CLIENTINFO


*/

apiEmitter.on('AUCTIONINFO', function(auctionInfo){
	console.log("response from api")
	console.log(auctionInfo);
	viewEmitter.emit('DRAWAUCTIONS', auctionInfo);
})

apiEmitter.on('CLIENTINFO', function(clientinfo){
	//console.log(clientinfo);
	viewEmitter.emit('RETURNCLIENT', clientInfo);
})

viewEmitter.on('GETDEBTORS', function(){
	console.log("middle get debtors");
	apiEmitter.emit('GETAUCTIONINFO','debtors');
})

viewEmitter.on('GETACCOUNTINFO', function(id){
	apiEmitter.emit('GETCLIENTINFO',id);
})


//var debtors = filter("debtor");
//var actual = find(accounts, 105);
//var auctions = [];




