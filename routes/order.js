var express = require("express"),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
    path = require('path'),
    dbPath = path.resolve(__dirname, './../db/foodmall.db'),
    db = new sqlite3.Database(dbPath);

//Showing All Orders
router.get("/", (req, res) => {

    db.all('SELECT * FROM orders', (err, rows) => {
        res.render("order", {
            orders: rows
        });
    });

});

//Showing All Orders
router.get("/new", (req, res) => {

    db.all("SELECT * FROM Item", (err, items) => {
        db.all("SELECT * FROM Chef", (err, chefs) => {
            db.all("SELECT * FROM Waiter", (err, waiters) => {
                db.all("SELECT * FROM Tables", (err, tables) => {
                    res.render("order/new", {
                        items,
                        chefs,
                        waiters,
                        tables
                    });
                });
            });
        });
    });
});

//Showing Specific Order
router.get("/:orderId", (req, res) => {

    var order = {};

    db.all('SELECT * FROM Orders NATURAL JOIN Student WHERE orderId = $orderId', {
        $orderId: req.params.orderId
    }, (err, row) => {
        order = row[0];

            //Adding Item IDs to Order
            db.all('SELECT * FROM OrderItem NATURAL JOIN Item WHERE orderId = $orderId', {
                $orderId: order.orderId
            }, (err, row) => {
                order.items = row;

                
                res.render("order/show", {
                    order: order
                });

            })
        });
});

router.post("/", (req, res) => {

    db.run("INSERT INTO Orders(orderTime, deliveryTime, tableNumber, chefId, waiterId, registrationNumber) VALUES(datetime('now', 'localtime'), NULL, $tableNumber, $chefId, $waiterId, $registrationNumber)", {
        $tableNumber: req.body.tableNumber,
        $chefId: req.body.chefId,
        $waiterId: req.body.waiterId,
        $registrationNumber: req.body.registrationNumber
    }, (err) => {

        if (err) {
            return console.log(err.message);
        }

        db.get("SELECT max(orderId) as orderId FROM Orders", (err, row) => {
            const orderId = row.orderId;
            const itemsOrdered = req.body.itemsOrdered.split(",").map((item) => {
                return [orderId, ...item.split("-")];
            }).slice(0, -1);

            itemsOrdered.forEach(item => {
                db.run("INSERT INTO OrderItem(orderId, itemId, quantity) VALUES ($orderId, $itemId, $quantity)", {
                    $orderId: item[0],
                    $itemId: Number(item[1]),
                    $quantity: Number(item[2])
                }, (err) => {
                    if (err) {
                        return console.log(err.message);
                    }

                });
            });

            setTimeout(() => {
                res.redirect("/order");
            }, 2000);

        });

    });
});

//Deleting Chef
router.post("/deliver", (req, res) => {
    // insert one row into the langs table
    db.run("UPDATE Orders SET deliveryTime = datetime('now', 'localtime') WHERE orderId = $orderId", {
        $orderId: req.body.orderId
    }, (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.redirect("/order/"+req.body.orderId);
    });
});

module.exports = router;