var dgram = require("dgram");
var osc = require('osc-min');

var server = dgram.createSocket("udp4");

server.on("error", function (err) {
  console.log("server error:\n" + err.stack);
  server.close();
});

var oscObj;

server.on("message", function(msg, rinfo) {
  var error;
  try {
    oscObj = osc.fromBuffer(msg);


  } catch (_error) {
    error = _error;
    return console.log("invalid OSC packet");
  }
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(5001);
// server listening 0.0.0.0:5001
