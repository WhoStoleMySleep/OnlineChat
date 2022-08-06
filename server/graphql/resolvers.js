const Message = require('../models/Message');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

module.exports = {
  Mutation: {
    async createMessage(_, { text, author, date }) {
      const newMessage = new Message({
        text: text,
        author: author,
        date: date
      });

      const res = await newMessage.save();

      pubsub.publish('MESSAGE_CREATED', {
        messageCreated: {
          id: res._id,
          text: text,
          author: author,
          date: date
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
        messageUpdated: {
          id: id,
          text: text,
        },
      });

      return res
    },
    removeMessage: async (_, { id }) => {
      const res = Message.find({ _id: id })

      await Message.deleteOne({ _id: id })

      pubsub.publish('MESSAGE_REMOVED', {
        messageRemoved: {
          id: id
        }
      })

      return `Removed ${id}`
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_CREATED'),
    },
    messageUpdated: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_UPDATED'),
    },
    messageRemoved: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_REMOVED')
    }
  },
  Query: {
    messages: async () => {
      return Message.find({});
    },
  },
};
