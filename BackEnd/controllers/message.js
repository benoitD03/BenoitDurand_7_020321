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

    const message = db.Message.create({
        idUSERS: userId,
        title: req.body.title,
        content: req.body.content,
        attachment: req.body.attachment
    })
    //message.save()
    .then(message => res.status(201).json({ message }))
    .catch(error => res.status(400).json({ error }));
        
   
}