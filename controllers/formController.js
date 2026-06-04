const validators = require('../utils/validators');

exports.validateForm = async (req, res) => {
  try {
    const { formData } = req.body;

    const validation = validators.validateFormData(formData);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }

    res.json({
      success: true,
      message: 'Form validation passed'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitForm = async (req, res) => {
  try {
    const { formData } = req.body;
    
    global.lastFormData = formData;

    res.json({
      success: true,
      message: 'Form submitted successfully',
      data: formData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
