const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const optimizeImage = require("../middleware/optimizeImage");
const bookCtrl = require("../controllers/book");

router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBestRatings);
router.get("/:id", bookCtrl.getOneBook);
router.post("/", auth, multer, optimizeImage, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.addRatingBook);
router.put("/:id", auth, multer, optimizeImage, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
