const {Router} =require("express");
const { validate } = require("../middleware/validate");
const { body,query } = require('express-validator');
const router = Router();

const GNewsController = require("./../controller/GNewsController");
const { errorHandler } = require("../middleware/error-handler");

router.get("/", (req, res) => {
    return res.send("Api is up and running");
});
router.get("/get-new-articles", [
    query("count").notEmpty().withMessage("count is required").isNumeric(),
    query("keyword").notEmpty().withMessage("keyword is required"),
],validate,GNewsController.fetchArticles);
router.use(errorHandler);

module.exports = router;