const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// allow cors origin
app.use(cors())

mongoose.connect('mongodb+srv://haofu:Fh9501201017@graphql.gin8n.mongodb.net/graphql?retryWrites=true&writeConcern=majority')

mongoose.connection.once('open', ()=> {
    console.log('Connected to database')
})

// middleware handles graphql requests
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
})