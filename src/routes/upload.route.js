const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');
const { imageUpload } = require('../../controllers/upload.controller');
const auth = require('../../middlewares/auth');

router.post('/upload', auth(), upload.single('image'), imageUpload);

module.exports = router;