const express = require("express");
const {ApolloServer} = require("@apollo/server");
const {expressMiddleware} = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

async function startserver(){
    // ! mark for the filed is require
    // to fetch something from api we use Query 
    //the logic for the query for what exactly we want (the function) is written in resolver 
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type User{
                id:ID
                name:String
                username:String
                email:String
                phone:String
                website:String
            }
            type Todo{
                id:ID!
                title: String!
                completed : Boolean! 
                user:User
            }
                type Query {
                getTodos: [Todo]
                getallUsers:[User]
                getUser(id :ID!): User
            }
        `
        ,
        resolvers: {
            Todo: {
                user: async (todo) =>
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data,
            },
            Query: {
                getTodos: async () =>
                    (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
                getallUsers: async () =>
                    (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
                getUser: async (parent, { id }) =>
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            },
        },        
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql" , expressMiddleware(server));

    app.listen(8000,()=> console.log("server listening at port 8000"))
}
startserver();