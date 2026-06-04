const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const excelParser = require('../utils/excelParser');

let currentWorkbook = null;
let currentFields = [];

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.files || !req.files.excelFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const excelFile = req.files.excelFile;
    const uploadPath = path.join(__dirname, '../uploads', excelFile.name);

    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    await excelFile.mv(uploadPath);

    const fields = await excelParser.parseExcel(uploadPath);
    
    currentWorkbook = uploadPath;
    currentFields = fields;

    res.json({
      success: true,
      message: 'Excel uploaded successfully',
      fields: fields,
      totalFields: fields.length,
      mandatoryFields: fields.filter(f => f.mandatory).length
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getFormFields = async (req, res) => {
  try {
    if (!currentWorkbook) {
      return res.status(400).json({ error: 'No Excel file uploaded' });
    }

    res.json({
      success: true,
      fields: currentFields,
      totalFields: currentFields.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentWorkbook = () => currentWorkbook;
exports.setCurrentWorkbook = (workbook) => { currentWorkbook = workbook; };
