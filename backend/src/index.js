const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://<user>:<password>@<cluster-name>-n9yyq.mongodb.net/<db-name>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors()); // test whitelisting only my IP
app.use(express.json());
app.use(routes);

server.listen(3333);
