/**
 * Created by Soumya on 11/22/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({

        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        facebook:{
            id:String,
            token:String,
            displayName:String
        },
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'Website'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.user"});

    return UserSchema;
};
