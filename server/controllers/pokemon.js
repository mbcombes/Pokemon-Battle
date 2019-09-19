const mongoose = require("mongoose");
const Pokemon = mongoose.model("Pokemon");
const User = mongoose.model("User");

module.exports = {
    all: (req, res) => {
        User.find().sort({ type: -1 })
        .then(allUsers => res.json({Users: allUsers}))
        .catch(err => res.json(err))
    },
    show: (req, res) => {
        const { id } = req.params;
        User.find( {_id: id} )
        .then(thisUser => res.json({User: thisUser}))
        .catch(err => res.json(err))
    },
    new: (req, res) => {
        userID=req.params.userID
        console.log(userID)
        Pokemon.create(req.body)
        .then(newPokemon => {
            console.log("new Pokemon worked:", newPokemon)
            User.find({_id: userID})
            .then(user => {
                console.log("user found!", user[0].pokemon)
                user[0].pokemon.push(newPokemon)
                console.log("after push")
                user[0].save()
                .then(success => {
                    console.log("save worked")
                    res.json(success)
                })
                .catch(err => {
                    console.log("save fail")
                    res.json(err)
                })
            })
            .catch(err => {
                console.log("find fail")
                res.json(err)
            })
        })
        .catch(err => {
            console.log("new user fail")
            res.json(err)
        })
    },
    update: (req, res) => {
        const { id } = req.params;
        User.find({_id: id})
        .then(thisUser => {
            console.log(thisUser)
            console.log("req.body", req.body)
            thisUser[0].name=req.body.name
            thisUser[0].type=req.body.type
            thisUser[0].description=req.body.description
            thisUser[0].skill1=req.body.skill1
            thisUser[0].skill2=req.body.skill2
            thisUser[0].skill3=req.body.skill3
            thisUser[0].likes=req.body.likes
            console.log("test:",thisUser)
            thisUser[0].save()
            .then(success => {
                console.log('user saved')
                res.json(success)
            })
            .catch(err => {
                console.log('user not saved')
                res.json(err)
            })
        })
        .catch(err => res.json(err))
    },
    destroy: (req, res) => {
        const { id } = req.params;
        User.remove({_id: id})
        .then(removed => res.json(removed))
        .catch(err => res.json(err))
    },
}