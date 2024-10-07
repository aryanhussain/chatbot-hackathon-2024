//imports express
const express = require('express');
require('dotenv').config();
const ApiRoutes = require("./src/apis");

//imports chatRoutes method from route file 
const nlpManager = require('./src/services/nlp/nlp_config');

const app = express();
const port = 8000;

const _routerOptions = {}
// ApiRoutes.mount(app, _routerOptions);
app.use('/api', ApiRoutes);

//triggers the train and saves the output of training when app is initialised
nlpManager.train().then(() => {
  nlpManager.save();
  //listens the requests on port 
  app.listen(port, () => {
    console.log(`Chat bot server is running on port ${port}`);
  });
});