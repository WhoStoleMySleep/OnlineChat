const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;


app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);


app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server started on port: ${PORT}`);
});
