const mongoose = require('mongoose')

const SALTS = 10

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 100,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        maxLength: 50,
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true
    }
})

UserSchema.pre('save', function(next) {

    let user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALTS, function(err, salt) {

        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.verifyPassword = async function(newPassword) {
    const isMatch = await bcrypt.compare(newPassword, this.password);
    return isMatch;
};

const User  = mongoose.model("User", UserSchema);
module.exports = User;