const express = require('express')
const User = require('./../models/user')
const auth = require('./../middleware/auth');
const errorToJsonFormatter = require('./../middleware/error');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelEmail } = require('./../emails/account');

const router = new express.Router();


// Sign up
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token});
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const user = req.user;

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        res.send(user);

    } catch (e) {
       if (e.name === 'ValidationError') {
        res.status(400).send({error: e.message}); 
       }
        res.status(400).send();
    }
});

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
            return callback(new Error('Supported avatar formats are jpg, jpeg and png'));
        }

        callback(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, errorToJsonFormatter);

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
}, errorToJsonFormatter);

router.get('/users/:id/avatar', async (req, res) => {

    try {
        const user = await User.findById({ _id: req.params.id });

        if (!user || !user.avatar) {
            throw new Error('No user or avatar');
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }

}, errorToJsonFormatter);

router.delete('/users/me', auth, async (req, res) => {

    try {
        //const user = await User.findByIdAndDelete(req.user._id);
        sendCancelEmail(req.user.email, req.user.name);
        await req.user.remove();

        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }

});

module.exports = router;