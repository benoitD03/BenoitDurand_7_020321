const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const models = require('../models');
const db = require('../models/index');


//const User = require('../models/user');
// REGEX 
const emailREGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordREGEX = /^(?=.*\d).{6,}$/;

// ****************** Inscription de l'utilisateur ******************
exports.signup = (req, res, next) => {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.passworrd;
    const description = req.body.description;
    const image = req.body.image;

    //Verification des champs remplis par l'utilisateur
    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error': 'Champ(s) manquant(s)'});
    }
    if (!emailREGEX.test(email)) {
        return res.status(400).json({ 'error': 'email non valide'});
    }
    if (!passwordREGEX.test(password)) {
        return res.status(400).json({ 'error': 'Le mot de passe doit compter minimum 6 caractères et inclure un chiffre'});
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

    const email = req.body.email;
    const password = req.body.passworrd;

    //Verification des champs remplis par l'utilisateur
    if (email == null || password == null) {
        return res.status(400).json({ error: 'Champ(s) manquant(s)'});
    }

    db.User.findOne({
        where: { email: email }
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error : 'Utilisateur non trouvé'})
        } 
        bcrypt.compare(req.body.passworrd, user.passworrd)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error : 'Mot de passe incorrect'})
                }
                res.status(200).json({
                    user,
                    token: jwt.sign(
                        { userId: user.id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '5h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// ****************** Afficher un utilisateur ******************

exports.getUserProfile = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    db.User.findOne({
        attributes: ['id', 'email', 'username', 'description', 'image'],
        where: { id: userId }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};