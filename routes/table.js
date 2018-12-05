var express = require("express"),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path'),
    dbPath = path.resolve(__dirname, './../db/foodmall.db'),
    db = new sqlite3.Database(dbPath);

//Add/Show Tables
router.get("/", (req, res) => {
    db.all('SELECT * FROM Tables', (err, rows) => {
        res.render("table", {
            tables: rows
        });
    });
});

//Add Table
router.post("/", (req, res) => {
    // insert one row into the langs table
    db.run("INSERT INTO Tables(tableNumber, seatCapacity, isAC) VALUES($tableNumber, $seatCapacity, $isAC)",{$tableNumber: req.body.tableNumber, $seatCapacity: req.body.seatCapacity, $isAC: req.body.isAC}, (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.redirect("/table");
    });
});

//Deleting Table
router.post("/delete", (req, res) => {
    // insert one row into the langs table
    db.run("DELETE FROM Tables WHERE tableNumber = $tableNumber",{$tableNumber: req.body.tableNumber}, (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.redirect("/table");
    });
});

module.exports = router;