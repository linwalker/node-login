/**
 * Created by linyuhua on 2017/5/15.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);