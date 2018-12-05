var express = require("express"),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path'),
    dbPath = path.resolve(__dirname, './../db/foodmall.db'),
    db = new sqlite3.Database(dbPath);

//Add New Chef Form
router.get("/new", (req, res) => {
    res.render("chef/new");
});

//Showing All Chefs
router.get("/", (req, res) => {

    db.all('SELECT * FROM Chef', (err, rows) => {
        res.render("chef", {
            chefs: rows
        });
    })
});

//Add Chef
router.post("/", (req, res) => {
    // insert one row into the langs table
    db.run("INSERT INTO Chef(chefId, chefName, dateOfBirth, mobileNumber, gender, salary) VALUES($chefId, $chefName, $dateOfBirth, $mobileNumber, $gender, $salary)", {
        $chefId: req.body.chefId,
        $chefName: req.body.chefName,
        $dateOfBirth: req.body.dateOfBirth,
        $mobileNumber: req.body.mobileNumber,
        $gender: req.body.gender,
        $salary: req.body.salary
    }, (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.redirect("/chef");
    });
});

//Deleting Chef
router.post("/delete", (req, res) => {
    // insert one row into the langs table
    db.run("DELETE FROM Chef WHERE chefId = $chefId", {
        $chefId: req.body.chefId
    }, (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.redirect("/chef");
    });
});


module.exports = router;