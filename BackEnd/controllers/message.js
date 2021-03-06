const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models');

// ****************** Création d'un message ******************

exports.createMessage = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    db.User.findOne({
        where: { id: userId }
    })
    .then(userFound => {
        if (!userFound) {
            return res.status(400).json({ message: 'Utilisateur inéxistant'})
        } 
    })
    .catch(error => res.status(500).json({ error })); 

     db.Message.create({
        idUSERS: userId,
        title: req.body.title,
        content: req.body.content,
        attachment: req.body.attachment
    })
    .then(message => res.status(201).json({ message }))
    .catch(error => res.status(400).json({ error }));
        
}

// ****************** Afficher tous les message ******************

exports.getAllMessages = (req, res, next) => {
    db.Message.findAll({
        include: [{
            model:db.User,
            attributes: ['username', 'image']
        }]
    })
    .then(messages => res.status(200).json({ messages }))
    .catch(error => res.status(400).json({ error }));
};

// ****************** Effacer un message ******************
exports.deleteMessage = (req, res, next) => {
    db.Message.findOne({
        where: { id: req.params.id }
    })
    .then(() => {
        db.Message.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Message supprimé'}))
        .catch(error => res.status(500).json({ error }));
    })
};