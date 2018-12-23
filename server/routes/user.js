const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const _ = require('lodash')

const app = express()

app.get('/user', (req, res) => {
    
    let desde = req.query.desde
    let limit = req.query.limit || 5

    // User.findById(id ,(err , user) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     res.json({
    //         ok:true,
    //         user
    //     })
    // })
    
    desde = Number(desde)
    limit = Number(limit)

    if (!Number(desde) || !Number(limit)) {
        return res.status(400).json({
            ok: false,
            err: 'Parameter send is not number'
        })
    }

    User.find({ status: true}, 'nombre email img role status google')
    .skip(desde)
    .limit(limit)
    .exec((err, result) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        
        User.count({ status: true}, (err, count) => {
            res.json({
                ok: true,
                result,
                count
            })
        })
        
    })

})

app.post('/user', (req, res) => {

    let body = req.body
    
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })
    
    user.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                userDB
            })
        }
    })
})

app.put('/user/:id', (req, res) => {
    
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'status'])

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true}, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            userDB
        })

        console.log('userDB', userDB)

    })


})

app.delete('/user/:id', (req, res) => {

    let id = req.params.id
    
    User.findByIdAndRemove(id, (err, deleteUser) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    
        if (deleteUser === null) {
            return res.status(400).json({
                ok: false,
                error : {
                    message : 'User not found'
                }
            })
    
        }

        res.json({
            ok: true,
            deleteUser
        })

    })

})

module.exports = app;