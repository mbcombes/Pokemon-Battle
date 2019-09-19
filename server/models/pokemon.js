const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
    name: {type: String},
    health: {type: Number},
    img: {type: String},
    move1: {
        name: {type: String},
        damage: {type: Number},
        description: {type: String}
    },
    move2: {
        name: {type: String},
        damage: {type: Number},
        description: {type: String}
    },
    move3: {
        name: {type: String},
        damage: {type: Number},
        description: {type: String}
    },
    move4: {
        name: {type: String},
        damage: {type: Number},
        description: {type: String}    
    },
}, {timestamps: true});
 
mongoose.model("Pokemon", PokemonSchema);