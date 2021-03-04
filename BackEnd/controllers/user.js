const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const db = require('../models/index');


const User = require('../models/user');

// ****************** Inscription de l'utilisateur ******************
exports.signup = (req, res, next) => {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.passworrd;
    const description = req.body.description;
    const image = req.body.image;

    //Verification des champs remplis par l'utilisateur
    if (email == null || username == null || password == null) {
        return res.status(400).json({ error: 'Champ(s) manquant(s)'});
    }
    
    db.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then( userFound => {
        if (!userFound) {
            bcrypt.hash(password, 10)
            .then(hash => {
                const user = new db.User({
                    email: email,
                    username: username,
                    passworrd: hash,
                    description: description,
                    isAdmin: false,
                    image: image
                });
            user.save()
                .then(user => res.status(201).json( user ))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(409).json({ 'error': 'Utilisateur déja existant !'});
        }
    }) 
};



// ****************** Connexion de l'utilisateur ******************
exports.login = (req, res, next) => {

};