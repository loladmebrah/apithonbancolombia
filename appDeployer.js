const express = require('express'); 
const EventEmmitter = require('events');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const Client = require('node-rest-client').Client;
const utf8 = require('utf8');
var fs = require('fs');
var indexhtml = fs.readFileSync('./index.html');
var otpdatahtml = fs.readFileSync('./otpdata.html');
var subastas_view = fs.readFileSync('./Vistas/subastas.html');
var client = new Client();

var client_id = '';
var client_secret = '';
var catalog = '';
var redirect_uri = '';
var scope = '';
var response_type = '';
var code = '';

var mainSocket = new EventEmmitter();

mainSocket.on('DRAWAUCTIONS', function(info){
	io.emit('DRAWAUCTIONS',info);
});

mainSocket.on('UPDATEACTUAL', function(info){
  io.emit('UPDATEACTUAL',info);
});

mainSocket.on('RETURNCLIENT', function(info){
	io.emit('RETURNCLIENT',info);
});

mainSocket.on('UPDATEAUCTIONS', function(info){
  console.log("update auctions");
  io.emit('UPDATEAUCTIONS', info);
});

app.use(express.static(__dirname+'/Vistas'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', function(req, res){
  //res.sendFile(__dirname + '/index.html','binary');
  res.write(indexhtml);
});

app.get('/otpdata', function (req, res) {
    res.write(otpdatahtml);
    res.end();
});

app.get('/guardardatos', function(req, res) {
  client_id = req.query.client_id;
  client_secret = req.query.client_secret;
  catalog = req.query.catalog;
  redirect_uri = req.query.redirect_uri;
  scope = req.query.scope;
  response_type = req.query.response_type;
  res.send('Datos almacenados en server');
});

app.get('/getaccesscode', function(req, res) {
  console.log("Entrada a getaccesscode");
  code = req.query.code;
  getToken(code, client_id, client_secret, req, res);
  //res.send('')
  //res.send('<div><style media="screen" type="text/css">.container-code{height: 70vh;display: flex;align-items: center;justify-content: center;}.container-code > div{display: flex;flex-direction: column;align-items: center;margin: 0px 100px !important;}.container-code > div > div:nth-child(1) > span{color: #df001e;font-weight: 700;font-size:20px;}.container-code > div > div:nth-child(2) > p{text-align:center;}.container-code > div > div{margin: 5px 0px;}.container-code > div > form{margin: 15px 0px;}.oauth-button {text-decoration: none !important;border-radius: 4px;color: #fff;border-color: #005296;cursor: pointer;background-image: none;border: none;padding: 17px 28px;font-size: 15px;margin: 0px 5px;}.oauth-button-blue{background-color: #00418b;box-shadow: 0 0 20px #00418b;}</style><div class="container-code"><div><div><span>Authorization code</span></div><div><p>'+code+'</p></div><form action=/generartoken><button class="oauth-button oauth-button-blue">Generar Token</button></form></div></div></div>');
});

function getToken(code, client_id_, client_secret_, req, res){

  var authorization = client_id+":"+client_secret;
  var encodedauth = new Buffer(authorization).toString('base64');
  
  let args = {
    parameters: {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
      scope: scope
    },
    headers: {
      "accept":"application/json",
      "apim-debug":"true",
      "content-type":"application/x-www-form-urlencoded",
      "authorization":"Basic "+encodedauth
    }
  }
  console.log("Obtener Token de getToken");
  
  try{  
    client.post('https://api.us.apiconnect.ibmcloud.com/bancolombiabluemix-dev/sandbox/hackathon/v1/security/oauth-otp/oauth2/token', args, function (data, response) {
      console.log("token Obtenido:");
      console.log(data.access_token);
      let token_args = { 
        //method: 'GET',
        //url: 'https://sbapi.bancolombia.com/hackathon/v1/operations/product-specific/accounts/account-details',
        headers: 
         { accept: 'application/vnd.bancolombia.v1+json',
           authorization: 'Bearer '+data.access_token 
         } 
      }
      client.post('https://sbapi.bancolombia.com/hackathon/v1/operations/product-specific/accounts/account-details', token_args, function (data, response) {
        console.log(data);
        res.setHeader('content-type', 'text/html; charset=utf-8');
        res.write(subastas_view);
        res.end();
      })

      
      //res.send('<div> <style media="screen" type="text/css">.container-code{width:100%;margin-top:150px;text-align:center;position:relative;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}.container-code>div>div:nth-child(1)>span{color:#df001e;font-weight:700;font-size:20px}p{width:800px;height:70px;display:inline-block;word-wrap:break-word}.oauth-button{text-decoration:none!important;border-radius:4px;color:#fff;border-color:#005296;cursor:pointer;background-image:none;border:0;padding:17px 28px;font-size:15px;margin:0 5px}.oauth-button-blue{background-color:#00418b;box-shadow:0 0 20px #00418b}</style> <div class="container-code"> <div> <div> <span>Token code</span> </div> <p>'+data.access_token+'</p> <form> <div> <a href="/" class="oauth-button oauth-button-blue"> Go to home</a> </div> </form> </div> </div> </div>');
    });
  }
  catch(e){
    console.log(e);
  }
}




io.on('connection', function(socket){
      socket.on('ASKDEBTORS', function(){
      	  console.log("asking for debtors");
          mainSocket.emit('GETDEBTORS');
      });

      socket.on('ASKCLIENTDATA', function(id){
      	  console.log("asking client data");
          mainSocket.emit('GETACCOUNTINFO', id);
      });

      socket.on('ASKACTUAL', function(){
          console.log("asking actual account");
          mainSocket.emit('GETACTUAL');
      });

      socket.on('ASKAUCTIONS', function(){
          console.log("asking participating auctions");
          mainSocket.emit('GETAUCTIONS');
      });

      socket.on('PARTICIPATE', function(info){
          console.log("participate in an auction");
          mainSocket.emit('PARTICIPATE', info);
      });

      socket.on('CHANGEACCOUNT', function(info){
          console.log("change account");
          mainSocket.emit('NEXTACCOUNT', info);
      });

      socket.on('ASKCLOSEDAUCTIONS', function(){
          console.log("asking actual account");
          mainSocket.emit('GETCLOSEDAUCTIONS');
      });
});

http.listen(4242, function(){
  console.log('listening on Server_Address:4242');
});

module.exports = {
	emitter: mainSocket
}



