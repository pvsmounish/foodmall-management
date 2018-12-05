var express     = require("express"),
    router  = express.Router();


//Showing HomePage
router.get("/", function(req, res){
    res.render("index");
});

module.exports = router;