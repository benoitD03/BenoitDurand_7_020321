const jwt = require('jsonwebtoken');
const db = require('../models/index');


module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    db.User.findOne({
        where: {id: userId},
        attributes: ['isAdmin']
    })
    .then(user => {
        if (user.isAdmin === true) {
            next();
        } else {
            return res.status(401).json({ error: 'Accès non autorisé'})
        }
    })
    .catch(error => res.status(500).json({ error })); 
};