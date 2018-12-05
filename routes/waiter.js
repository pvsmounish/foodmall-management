var express = require("express"),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path'),
    dbPath = path.resolve(__dirname, './../db/foodmall.db'),
    db = new sqlite3.Database(dbPath);

//Add New Waiter Form
router.get("/new", (req, res) => {
    res.render("waiter/new");
});

//Showing All Waiters
router.get("/", (req, res) => {

    db.all('SELECT * FROM Waiter', (err, rows) => {
        res.render("waiter", { waiters: rows });
    })
});

//Add Waiter
router.post("/", (req, res) => {
    // insert one row into the langs table
    db.run("INSERT INTO Waiter(waiterId, waiterName, dateOfBirth, mobileNumber, gender, salary) VALUES($waiterId, $waiterName, $dateOfBirth, $mobileNumber, $gender, $salary)", {
        $waiterId: req.body.waiterId,
        $waiterName: req.body.waiterName,
        $dateOfBirth: req.body.dateOfBirth,
        $mobileNumber: req.body.mobileNumber,
        $gender: req.body.gender,
        $salary: req.body.salary
    }, (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.redirect("/waiter");
    });
});

//Deleting Waiter
router.post("/delete", (req, res) => {
    // insert one row into the langs table
    db.run("DELETE FROM Waiter WHERE waiterId = $waiterId", {
        $waiterId: req.body.waiterId
    }, (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.redirect("/waiter");
    });
});

module.exports = router;