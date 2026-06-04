const uploadArea = document.getElementById('uploadArea');
const excelInput = document.getElementById('excelInput');
const uploadBtn = document.getElementById('uploadBtn');
const formSection = document.getElementById('formSection');
const dataForm = document.getElementById('dataForm');
const formFields = document.getElementById('formFields');
const downloadSection = document.getElementById('downloadSection');
const downloadBtn = document.getElementById('downloadBtn');
const messageDiv = document.getElementById('message');
const pagesRadios = document.querySelectorAll('input[name="pages"]');
const pageRangeInput = document.getElementById('pageRangeInput');

let currentFields = [];
let lastFormData = {};

uploadArea.addEventListener('click', () => excelInput.click());

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('drag-over');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    excelInput.files = files;
    handleFileUpload();
  }
});

excelInput.addEventListener('change', handleFileUpload);
uploadBtn.addEventListener('click', () => excelInput.click());

async function handleFileUpload() {
  if (!excelInput.files.length) return;

  const file = excelInput.files[0];
  const formData = new FormData();
  formData.append('excelFile', file);

  showMessage('Uploading Excel file...', 'info');
  uploadBtn.disabled = true;

  try {
    const response = await fetch('/api/upload-excel', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    currentFields = data.fields;
    renderFormFields();
    formSection.style.display = 'block';
    downloadSection.style.display = 'none';
    messageDiv.style.display = 'none';

    showMessage(
      `✓ Excel berhasil diupload! ${data.totalFields} field ditemukan (${data.mandatoryFields} wajib diisi)`,
      'success'
    );
  } catch (error) {
    showMessage(`✗ Error: ${error.message}`, 'error');
    console.error(error);
  } finally {
    uploadBtn.disabled = false;
  }
}

function renderFormFields() {
  formFields.innerHTML = '';

  currentFields.forEach((field) => {
    const div = document.createElement('div');
    div.className = 'form-group';

    const label = document.createElement('label');
    label.textContent = field.placeholder;
    if (field.mandatory) {
      const required = document.createElement('span');
      required.className = 'required';
      required.textContent = '*';
      label.appendChild(required);
    }

    const input = document.createElement('input');
    input.type = field.type;
    input.name = field.name;
    input.required = field.mandatory;
    input.placeholder = field.placeholder;

    div.appendChild(label);
    div.appendChild(input);
    formFields.appendChild(div);
  });
}

dataForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formDataObj = new FormData(dataForm);
  lastFormData = Object.fromEntries(formDataObj);

  const errors = [];
  currentFields.forEach((field) => {
    if (field.mandatory && !lastFormData[field.name]) {
      errors.push(`${field.placeholder} wajib diisi`);
    }
  });

  if (errors.length > 0) {
    showMessage(`✗ ${errors.join(', ')}`, 'error');
    return;
  }

  showMessage('Generating document...', 'info');

  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData: lastFormData })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    downloadSection.style.display = 'block';
    showMessage('✓ Form submitted! Siap untuk download.', 'success');
  } catch (error) {
    showMessage(`✗ Error: ${error.message}`, 'error');
    console.error(error);
  }
});

downloadBtn.addEventListener('click', async () => {
  const format = document.querySelector('input[name="format"]:checked').value;
  const pages = document.querySelector('input[name="pages"]:checked').value;

  downloadBtn.disabled = true;
  downloadBtn.classList.add('loading');

  try {
    const response = await fetch('/api/generate-document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formData: lastFormData,
        format: format,
        pages: pages === 'all' ? null : {
          start: parseInt(document.getElementById('pageStart').value),
          end: parseInt(document.getElementById('pageEnd').value)
        }
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    window.location.href = data.downloadUrl;
    showMessage(`✓ ${format.toUpperCase()} berhasil didownload!`, 'success');
  } catch (error) {
    showMessage(`✗ Error: ${error.message}`, 'error');
    console.error(error);
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.classList.remove('loading');
  }
});

pagesRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    pageRangeInput.style.display = radio.value === 'range' ? 'flex' : 'none';
  });
});

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';

  if (type === 'success') {
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 5000);
  }
}

window.addEventListener('load', async () => {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    console.log('✓ Server:', data.message);
  } catch (error) {
    console.error('✗ Server error:', error);
  }
});
