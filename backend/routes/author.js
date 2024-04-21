const express = require('express');

const router = express.Router();

const Author = require('../models/author');

// Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files.
const multer = require('multer');
// The bcrypt npm package is a JavaScript implementation of the bcrypt password hashing function that allows you to create a hash from a password string.
const bcrypt = require('bcrypt');
// Importing JWT token library that will be used in login to register user authentically
const jwt = require('jsonwebtoken');
const Article = require('../models/article');



filename = '';
const mystorage = multer.diskStorage({

    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        let f1 = date + '.' + file.mimetype.split('/')[1];
        // unisecond(3848347348).png
        redirect(null, f1);
        filename = f1;
    }
})


const upload = multer({ storage: mystorage })

router.post('/register', upload.any('image'), (req, res) => {

    data = req.body;
    author = new Author(data);

    author.image = filename;

    salt = bcrypt.genSaltSync(10);
    author.password = bcrypt.hashSync(data.password, salt);

    author.save()
        .then(
            (savedAuthor) => {
                filename = "";
                res.status(200).send(savedAuthor);
            }
        )
        .catch(
            err => {
                res.send(err)
            }
        )
})

router.post('/login', (req, res) => {

    let data = req.body;
    Author.findOne({ email: data.email })
        .then(
            (author) => {
                let valid = bcrypt.compareSync(data.password, author.password);
                if (!valid) {
                    res.send('email or password invalid');
                } else {

                    let payload = {
                        _id: author._id,
                        email: author.email,
                        fullname: author.name + ' ' + author.lastname
                    }

                    let token = jwt.sign(payload, '12345');
                    res.send({ mytoken: token })
                }
            }
        )
        .catch(
            err => {
                res.send(err);
            }
        )
})

router.get('/all', (req, res) => {

    Author.find({})
        .then(
            (authors) => {
                res.status(200).send(authors);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})


router.get('/getbyid/:id', (req, res) => {

    let id = req.params.id

    Author.findOne({ _id: id })
        .then(
            (author) => {
                res.status(200).send(author);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})

router.delete('/supprimer/:id', (req, res) => {

    let id = req.params.id
    Author.findByIdAndDelete({ _id: id })
        .then(
            (author) => {
                res.status(200).send(author);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )

})

// router.update('/update/:id', (req, res) => {

// })

module.exports = router;
