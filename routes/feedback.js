var express = require("express"),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path'),
    dbPath = path.resolve(__dirname, './../db/foodmall.db'),
    db = new sqlite3.Database(dbPath);

//Showing All Feedbacks
router.get("/", (req, res) => {

    db.all('SELECT * FROM Feedback', (err, rows) => {
        res.render("feedback", {feedbacks: rows});
    });
    
});

//Showing All Feedbacks
router.get("/new", (req, res) => {

    res.render("feedback/new");
});

router.post("/", (req, res) => {

    db.run("INSERT INTO Feedback (review, rating, registrationNumber, reviewTime) VALUES($review, $rating, $registrationNumber, datetime('now', 'localtime'))", {
        $review: req.body.review,
        $rating: req.body.rating,
        $registrationNumber: req.body.registrationNumber
    }, (err) => {

        if(err){
            return console.log(err.message);
        }

        res.redirect("/feedback");
    });
});

module.exports = router;