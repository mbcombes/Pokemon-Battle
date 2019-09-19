const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')
const PokemonSchema = require("./pokemon")

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "Username is required."], 
        minlength: [3, "Username must be at least 3 characters long"]
    },
    email: {   
        type: String, 
        unique: true, 
        required: [true, "Email is required."],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String, 
        required: [true, "Password is required."], 
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least eight characters, one uppercase letter, one lowercase letter, one number and one special character']
    },
    pokemon: [PokemonSchema]
}, {timestamps: true});
 
mongoose.model("User", UserSchema);
UserSchema.plugin(uniqueValidator, { message: '{VALUE} already in use, {PATH} must be unique' });