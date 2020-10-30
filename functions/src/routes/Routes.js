//Routes
let userRoute = require("./User");
let taskRoute = require("./Tasks");

//add the routes
let initRoutes = (app) => {
  app.use("", userRoute);
  app.use("", taskRoute);
  app.all("*", (req, res) => {
    return res.status(404).send("Sorry, requested route not found");
  });
};

//export
module.exports = initRoutes;
