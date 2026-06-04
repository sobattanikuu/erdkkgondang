const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const excelController = require('../controllers/excelController');
const formController = require('../controllers/formController');
const docController = require('../controllers/docController');

// Excel routes
router.post('/upload-excel', excelController.uploadExcel);
router.get('/form-fields', excelController.getFormFields);

// Form routes
router.post('/validate-form', formController.validateForm);
router.post('/submit-form', formController.submitForm);

// Document routes
router.post('/generate-document', docController.generateDocument);
router.get('/download/:filename', docController.downloadFile);
router.post('/export-pdf', docController.exportToPDF);

module.exports = router;
