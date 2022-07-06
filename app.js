const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const Chat = require('./models/chat');
const { render } = require('ejs');

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

app.get('/chats', (req, res) => {
    Chat.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All Chats', chats: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/chats', (req,res) => {
    const chat = new Chat(req.body)
    chat.save()
        .then((result) => {
            res.redirect('/chats');
        })
        .catch((err) => {
            console.log(error)
        })
})

//redirect
app.get('/chats/create', (req, res) =>{
    res.render('create', {title: "Create a New Blog"});

})

//displays content for each room. You will have to change this for socket io
app.get('/chats/:id', (req, res) => {
    const id = req.params.id;
    Chat.findById(id)
        .then((result) => {
            res.render('details', {chat: result, title: 'Chat Details'})

        })
        .catch((err) => {
            console.log(err);
        })
})

//deletes a chat
app.delete('/chats/:id', (req,res) => {
    const id = req.params.id
    Chat.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/chats'})
        })
        .catch(err => {
            console.log(err)
        })
})


//404 (use method always fire but only if it is reached)
app.use((req, res) => {
    res.status(404).render('404', {title: "404"});
})