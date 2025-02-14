const mongoose = require('mongoose');

let validateEmail = function(email) {
    // expression régulière
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: { type: String, minlength: [2, "lastName must have minimum 2 characters"], maxlength: [40, "lastName must have maximum 40 characters"] },
    email: {type: String, required: true, unique: true, validate: [validateEmail, 'invalid email address']},
    password: String
})

userSchema.pre('save',function(next){
    if (this.firstName) {
        this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase();
    }
    if (this.lastName) {
        this.lastName = this.lastName.slice(0).toUpperCase();
    }
    console.log('Fonction exec avant le save :');
    console.log(this);
    next();
})

const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;