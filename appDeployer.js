const express = require('express'); 
const EventEmmitter = require('events');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var innerSocket = new EventEmmitter();