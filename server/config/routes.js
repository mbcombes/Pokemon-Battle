const users = require("../controllers/users");
const pokemon = require('../controllers/pokemon')
const path = require("path")


module.exports = (app) => {
    app.get("/api/users", users.all),                 //GET: All users
    app.get("/api/users/:id", users.show),            //GET: One user by id
    app.post("/api/users", users.new),                //POST: Create a user
    app.put("/api/users/:id", users.update),          //PUT: Update a user by id
    app.delete("/api/users/:id", users.destroy),       //DELETE: Delete a user by id
    app.get("/api/users/:username/:pw", users.login),         //Login: check to see if user exsists.

    app.post("/api/pokemon/:userID", pokemon.new)               //POST: Create a Pokemon and add to user
    
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("../rxjs-chat/dist/rxjs-chat/index.html"))
    });
    
}