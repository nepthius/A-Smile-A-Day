const express = require('express');
const Chat = require('../models/chat');

//Look into controllers later


const router = express.Router();

//Displays all chats
router.get('/', (req, res) => {
    Chat.find().sort({createdAt: -1})
        .then((result) => {
            res.render('chats', {title: 'All Chats', chats: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

//Posts a new chat and then redirects to /chats
router.post('/', (req,res) => {
    const chat = new Chat(req.body)
    chat.save()
        .then((result) => {
            res.redirect('/chats');
        })
        .catch((err) => {
            console.log(error)
        })
})

//redirects to create a new chat
router.get('/create', (req, res) =>{
    res.render('create', {title: "Create a New Blog"});

})

//displays content for each room. You will have to change this for socket io
router.get('/:id', (req, res) => {
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
router.delete('/:id', (req,res) => {
    const id = req.params.id
    Chat.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/chats'})
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;
