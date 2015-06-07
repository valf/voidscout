var Player = require("../models/Player");

module.exports = function (app) {

    // TODO make real REST API for backbone models
    app.get("/players/:id", function (req, res) {
        res.json(Player.findBy("id", req.params.id ));
    });

    app.post("/players", function ( req, res ) {
        //var id = req.params.id || req.body.id;
        res.json({});
    });

};
