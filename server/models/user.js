const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let rolValidator = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema

let user = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum : rolValidator
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

user.methods.toJSON = function () {

    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}

user.plugin(uniqueValidator, {message: '{PATH} debe de ser único'})

module.exports = mongoose.model('user', user)
