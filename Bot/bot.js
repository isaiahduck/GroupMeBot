//Change .env to include correct Bot ID

var HTTPS = require('https');
var botID = process.env.BOT_ID;

function receive() {
  var request = JSON.parse(this.req.chunks[0]), 
  var signal = 'Bot';   //[String] signal to the bot to wake up

  if(request.text == signal) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("N/A");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = 'Bot [String] response goes here';

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //ERROR
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.receive = receive;