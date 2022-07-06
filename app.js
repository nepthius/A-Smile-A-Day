const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const { render } = require('ejs');
const chatRoutes = require('./routes/chatRoutes')

//look into controllers later

//express app
const app = express();
dotenv.config()

//connect to Mongodb
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mentalhealth.lcsallq.mongodb.net/mentalhealth?retryWrites=true&w=majority`
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs');

//middleware and static file
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})) //Accepts form data and converts

//mongoose and mongo sandbox routes


//respond to requests
app.get('/', (req, res) => {
    res.redirect('/chats')
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About"});
})

//chat routes
app.use('/chats', chatRoutes);


//404 (use method always fire but only if it is reached)
app.use((req, res) => {
    res.status(404).render('404', {title: "404"});
})