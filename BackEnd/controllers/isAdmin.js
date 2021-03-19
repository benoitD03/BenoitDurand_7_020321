const db = require('../models/index');

// ****************** Nommer un administrateur ******************
exports.becomeAdmin = (req, res, next) => {
    db.User.update({ isAdmin: 1 },
    { where: { id: req.params.id }
})
.then(() => res.status(201).json({ message: 'Droits accordés' }))
.catch(error => res.status(500).json({ error }));
}

// ****************** Enlever les droits d'administrateur ******************
exports.stopAdmin = (req, res, next) => {
    db.User.update({ isAdmin: 0 },
    { where: { id: req.params.id }
})
.then(() => res.status(201).json({ message: 'Droits supprimés' }))
.catch(error => res.status(500).json({ error }));
}