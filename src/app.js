const express = require("express");
const http = require("http");
const ws = require("ws");
const server = http.createServer(express);
const port = 8080;
const wsServer = new ws.Server({ server });
const user = [
  {
    phone: "09107122282",
    userName: "alizzjvn1",
  },
  {
    phone: "09107122283",
    userName: "alizzjvn2",
  },
  {
    phone: "09107122284",
    userName: "alizzjvn3",
  },
];
wsServer.on("connection", (wss) => {
  wss.on("message", (input) => {
    wsServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) {
        const data = JSON.parse(input);
        user.map((user_data) => {
          if (user_data.phone == data.phone) {
            return client.send(JSON.stringify({
              data:data,
              user:user_data
            }));
          }
        });
        
      }
    });
  });
});

server.listen(port, () => {
  console.log("listening on: ", port);
});
