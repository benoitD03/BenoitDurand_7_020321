const db = require('../models/index');

// ****************** Supprimer un message ******************

exports.deleteMessage = (req, res, next) => {
    db.Message.destroy({
        where: { id: req.params.id}
    })
    .then(() => res.status(200).json({ message: 'Message supprimé !'}))
    .catch(error => res.status(500).json({ error }));
};

// ****************** Supprimer un Utilisateur ******************

exports.deleteUser = (req, res, next) => {
    db.User.destroy({
        where: { id: req.params.id}
    })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
    .catch(error => res.status(500).json({ error }));
};