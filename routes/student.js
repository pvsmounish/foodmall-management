var express = require("express"),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path'),
    dbPath = path.resolve(__dirname, './../db/foodmall.db'),
    db = new sqlite3.Database(dbPath);

//Showing Student Module
router.get("/new", (req, res) => {
    res.render("student/new");
});

//Showing All Students
router.get("/", (req, res, next) => {

    db.all("SELECT * FROM Student", (err, rows) => {
        res.render("student", {
            students: rows
        });
    });
});

//Add Student
router.post("/", (req, res) => {
    db.run("INSERT INTO Student (registrationNumber, studentName, dateOfBirth, branch, mobileNumber, gender, balance) VALUES ($registrationNumber, $studentName, $dateOfBirth, $branch, $mobileNumber, $gender, $balance)", {
        $registrationNumber: req.body.registrationNumber,
        $studentName: req.body.studentName,
        $dateOfBirth: req.body.dateOfBirth,
        $branch: req.body.branch,
        $mobileNumber: req.body.mobileNumber,
        $gender: req.body.gender,
        $balance: req.body.balance
    }, (err) => {
        if (err) {
            return console.log(err.message);
        }
        db.run("INSERT INTO RoomDetails (registrationNumber, hostelBlock, roomNumber) VALUES ($registrationNumber, $hostelBlock, $roomNumber)", {
            $registrationNumber: req.body.registrationNumber,
            $hostelBlock: req.body.hostelBlock,
            $roomNumber: req.body.roomNumber
        }, (err) => {
            if (err) {
                return console.log(err.message);
            }
            res.redirect("/student");
        });
    });



});

//Deleting Student
router.post("/delete", (req, res) => {
    // insert one row into the langs table
    db.run("DELETE FROM Student WHERE registrationNumber = $registrationNumber", {
        $registrationNumber: req.body.registrationNumber
    }, (err) => {
        if (err) {
            return console.log(err.message);
        }

        db.run("DELETE FROM RoomDetails WHERE registrationNumber = $registrationNumber", {
            $registrationNumber: req.body.registrationNumber
        }, (err) => {
            if (err) {
                return console.log(err.message);
            }
            res.redirect("/student");
        });
    });
});


//Showing Specific Student
router.get("/:registrationNumber", (req, res) => {


    db.all("SELECT * FROM Student, RoomDetails WHERE Student.registrationNumber = $registrationNumber AND RoomDetails.registrationNumber = $registrationNumber", {
        $registrationNumber: req.params.registrationNumber
    }, (err, students) => {

        db.all("SELECT orderId, orderTime, deliveryTime, totalAmount FROM Orders WHERE registrationNumber = $registrationNumber", {
            $registrationNumber: req.params.registrationNumber
        }, (err, orders) => {

            db.all("SELECT * FROM Feedback WHERE registrationNumber = $registrationNumber", {
                $registrationNumber: req.params.registrationNumber
            }, (err, feedbacks) => {

                res.render("student/show", {
                    student: students[0],
                    orders: orders,
                    feedbacks: feedbacks
                });
            });
        });
    });

});

module.exports = router;