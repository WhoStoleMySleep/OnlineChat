const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const Comment = require('../models/comment');


const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addComment: {
      type: CommentType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { text, author }) {
        const comment = new Comment({
          text,
          author,
        });
        comment.save();
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Comment.findById(id);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      args: { start: { type: GraphQLInt }, end: { type: GraphQLInt } },
      resolve(parent, args) {
        return Comment.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
