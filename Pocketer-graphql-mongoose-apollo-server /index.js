const express               = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { find, filter } = require('lodash');
require('./config');
const { newsModel } = require('./model');
  
const typeDefs = gql`
    type News {
        id: ID!
        cate:String,
        title: String,
        source: String,
        time: String, 
        url:  String ,
        excerpt: String,
        saveCount:String,
        imageUrl:String,
    }

    type Query {
        getAllNews: [News],
        getCateNews:[News],
    }
    type Mutation {
        addOneNews(
            cate:String,
            title: String, 
            source: String,
            time:String,
            url: String,
            excerpt: String,
        ): News
    }
`;

const resolvers = {
    Query: {
        getAllNews: async () => await newsModel.find({}).exec(),
        getCateNews:async (args)=> await newModel.find({cate:args.cate}).exec(),
    },
    Mutation: {
        addOneNews: async (_, args) => {
            try {
                console.log(args);
                let response = await newsModel.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

