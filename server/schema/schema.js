const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;



const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    author: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      args: { start: { type: GraphQLInt }, end: { type: GraphQLInt } },
      resolve(parent, args) {
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
