const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/User');

// creation d'un utilisateur
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password, phone_number, date_of_birth } = req.body;
    const password_hash = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            first_name,
            last_name,
            date_of_birth,
            email,
            password_hash,
            phone_number,
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// connexion
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(password, user.password_hash)
        if (!isMatch) return res.status(401).json({ error: 'Utilisateur ou Mot de passe incorrect' })

        const token = jwt.sign({ user_id: user.user_id }, 'ahmed_one', { expiresIn: '1h' })
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// obtenir tout les utilisateurs
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// modifier un utilisateur par id
exports.updateUser = async (req, res) => {
    try {
        const { first_name, last_name, email, phone_number } = req.body;
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.phone_number = phone_number;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ eroor: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// supprimer un utiliisateur par un id
exports.deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        console.log('Deleting user with ID:', userId);

        const user = await User.findByPk(userId);
        console.log('Found user:', user);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        await user.destroy();
        console.log('User deleted successfully');
        res.status(204).send({ msg: 'Utilisateur supprimé' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: error.message });
    }
};
