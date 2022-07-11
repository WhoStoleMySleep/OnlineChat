const { gql } = require('apollo-server');

module.exports = gql`
  type Message {
    id: ID!
    text: String!
    author: String!
  }

  input MessageInput {
    text: String
    author: String
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    createMessage(text: String!, author: String!): ID!
  }

  type Subscription {
    messageCreated: Message
  }
`;
