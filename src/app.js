const express = require("express");
const http = require("http");
const ws = require("ws");
const server = http.createServer(express);
const port = 8080;
const wsServer = new ws.Server({ server });

wsServer.on("connection", (wss) => {
  wss.on("message", (input) => {
    wsServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) {
        const data = JSON.parse(input)
        if(data.password === "123456"){
          console.log(data.message);
          client.send(JSON.stringify(data))
        }
      }
    });
  });
});

server.listen(port, () => {
  console.log("listening on: ", port);
});
