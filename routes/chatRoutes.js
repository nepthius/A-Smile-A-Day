const express = require('express');
const Chat = require('../models/chat');

//Look into controllers later

const router = express.Router();

router.get('/', (req, res) => {
    Chat.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All Chats', chats: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/', (req,res) => {
    const chat = new Chat(req.body)
    chat.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(error)
        })
})

//redirect
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
            res.json({ redirect: '/'})
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;
