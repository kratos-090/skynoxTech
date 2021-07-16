// User Routes
const express = require('express');
const User = require('../models/users')
const auth = require('../middleware/auth');
const router = new express.Router();

// Creating the user
router.post('/users', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

// for login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });

    } catch (error) {
        res.status(400).send(error);

    }
})

// for logout from current device
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;

        })
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);

    }
})
// for loging out form all devices
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save();
        res.send();

    } catch (error) {
        res.status(500).send(error);

    }
})

//for getting the userprofile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);

})

//Updating the user profile
router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const validUpdates = ['name', 'password', 'email', 'age'];
    const isValidOperation = updates.every((update) => {
        return validUpdates.includes(update);
    })
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid Updates' });

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        });

        await req.user.save();

        res.send(req.user);
    }
    catch (e) {
        res.status(400).send(e);
    }

})


// for deleting the user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)

    } catch (error) {
        res.status(500).send()

    }
})





module.exports = router;