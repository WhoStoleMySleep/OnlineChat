const Message = require('../models/Message');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

module.exports = {
  Mutation: {
    async createMessage(_, { text, author }) {
      const newMessage = new Message({
        text: text,
        author: author,
      });

      const res = await newMessage.save();

      pubsub.publish('MESSAGE_CREATED', {
        messageCreated: {
          text: text,
          author: author,
        },
      });

      return {
        id: res.id,
        ...res._doc,
      };
    },
    updateMessage: async (_, { id, text }) =>  {
      const res = Message.find({ _id: id })

      await Message.updateOne(
        { _id: id },
        { $set: { 'text': text } }
      )

      pubsub.publish('MESSAGE_UPDATED', {
        messageCreated: {
          id: id,
          text: text,
        },
      });

      return res
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_CREATED'),
    },
    messageUpdated: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_UPDATED'),
    },
  },
  Query: {
    messages: async () => {
      return Message.find({});
    },
  },
};
