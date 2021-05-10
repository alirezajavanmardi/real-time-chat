const express = require("express");
const http = require("http");
const ws = require("ws");
const server = http.createServer(express);
const port = 8080;
const wsServer = new ws.Server({ server });

wsServer.on("connection", (wss) => {
  wss.on("message", (message) => {
    wsServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) client.send(message);
    });
  });
});

server.listen(port, () => {
  console.log("listening on: ", port);
});
