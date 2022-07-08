const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

mongoose.connect(
  'mongodb+srv://konstantin:e3oNRt6py371SPuh@onlinechat.nxh452d.mongodb.net/?retryWrites=true&w=majority'
);

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

const dbConnection = mongoose.connection;
dbConnection.on('Error', (error) => {
  console.log(`Connection error: ${error}`);
});
dbConnection.once('open', () => {
  console.log('Connected to DB!');
});

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server started on port: ${PORT}`);
});
