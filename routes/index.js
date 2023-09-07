const router = require("express").Router();
const apiRoutes = require("./api");

//CRUD Routes
router.use("/api", apiRoutes);

//Error Message
router.use((req, res) => res.send("Wrong route!"));

module.exports = router;