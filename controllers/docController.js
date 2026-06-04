const path = require('path');
const fs = require('fs');
const docGenerator = require('../utils/docGenerator');
const pdfGenerator = require('../utils/pdfGenerator');

exports.generateDocument = async (req, res) => {
  try {
    const { formData, format } = req.body;

    if (!formData) {
      return res.status(400).json({ error: 'Form data required' });
    }

    if (!['docx', 'pdf'].includes(format)) {
      return res.status(400).json({ error: 'Invalid format. Use docx or pdf' });
    }

    const docPath = await docGenerator.generateDocument(formData, format);

    res.json({
      success: true,
      message: 'Document generated successfully',
      downloadUrl: `/api/download/${path.basename(docPath)}`,
      filename: path.basename(docPath)
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.downloadFile = (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../downloads', filename);

    if (!filepath.startsWith(path.join(__dirname, '../downloads'))) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filepath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.exportToPDF = async (req, res) => {
  try {
    const { formData, pages } = req.body;

    const pdfPath = await pdfGenerator.generatePDF(formData, pages);

    res.json({
      success: true,
      downloadUrl: `/api/download/${path.basename(pdfPath)}`,
      filename: path.basename(pdfPath)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
