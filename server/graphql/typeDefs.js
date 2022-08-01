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
    createMessage(text: String!, author: String!): Message!
    updateMessage(id: ID!, text: String!): [Message!]
    removeMessage(id: ID!): String!
  }

  type Subscription {
    messageCreated: Message
    messageUpdated: Message
    messageRemoved: Message
  }
`;
