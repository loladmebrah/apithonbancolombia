const fs = require('fs');
const util = require('util');
const EventEmmitter = require('events');
const apiController = require('./apiModule.js');

const apiEmitter =  apiController.emitter;

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
	console.log(auctionInfo);
})

apiEmitter.on('CLIENTINFO', function(clientinfo){
	console.log(clientinfo);
})

apiEmitter.emit('GETAUCTIONINFO','medium');
apiEmitter.emit('GETCLIENTINFO','123143543');