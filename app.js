const express     = require("express"),
    app         = express(),
    bodyParser = require("body-parser");



//Requiring Routes
const indexRoutes = require("./routes/index"),
    studentRoutes = require("./routes/student"),
    chefRoutes = require("./routes/chef"),
    waiterRoutes = require("./routes/waiter"),
    orderRoutes = require("./routes/order"),
    itemRoutes = require("./routes/item"),
    tableRoutes = require("./routes/table"),
    feedbackRoutes = require("./routes/feedback");





app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

app.use("/", indexRoutes);
app.use("/student", studentRoutes);
app.use("/chef", chefRoutes);
app.use("/waiter", waiterRoutes);
app.use("/order", orderRoutes);
app.use("/item", itemRoutes);
app.use("/table", tableRoutes);
app.use("/feedback", feedbackRoutes);



app.listen(process.env.PORT || 5000, function(){
    console.log("The Foodmall Server Has Started!");
    console.log(process.env.PORT || 5000);
});