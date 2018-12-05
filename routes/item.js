var express = require("express"),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path'),
    dbPath = path.resolve(__dirname, './../db/foodmall.db'),
    db = new sqlite3.Database(dbPath);

//Add New Item Form
router.get("/new", (req, res) => {
    res.render("item/new");
});

//Showing Item Module
router.get("/", (req, res) => {

    db.all("SELECT * FROM Item", (err, rows) => {
        res.render("item", {items: rows});
    });

});

//Add Item
router.post("/", (req, res) => {
    // insert one row into the langs table
    db.run("INSERT INTO Item(itemId, itemName, price, type ) VALUES($itemId, $itemName, $price, $type)", {
        $itemId: req.body.itemId,
        $itemName: req.body.itemName,
        $price: req.body.price,
        $type: req.body.type
    }, (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.redirect("/item");
    });
});

//Deleting Chef
router.post("/delete", (req, res) => {
    // insert one row into the langs table
    db.run("DELETE FROM Item WHERE itemId = $itemId", {
        $itemId: req.body.itemId
    }, (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.redirect("/item");
    });
});

module.exports = router;