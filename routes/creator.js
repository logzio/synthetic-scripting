const express = require('express');
const creatorController = require('../controllers/creator');

const router = express.Router();

// modifyFile
router.post('/modify-file', creatorController.modifyFile);
// createZip
router.post('/create-zip', creatorController.createZip);
// uploadZipToS3
router.post('/uploadZip', creatorController.uploadZipToS3);
//createLambda
router.post('/create-lambda', creatorController.createLambda);
//addEventBridge
router.post('/add-eventbridge', creatorController.addEventBridge);

router.post('/modify-file-local', creatorController.modifyFileLocally);

router.post('/create-cf-zip', creatorController.createZipCF);

module.exports = router;
