exports.validateFormData = (formData) => {
  const errors = [];
  
  for (const [key, value] of Object.entries(formData)) {
    if (key.includes('Wajib') && (!value || value.trim() === '')) {
      errors.push(`${key} is required`);
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
};

exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.validatePhone = (phone) => {
  const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
  return phoneRegex.test(phone);
};
