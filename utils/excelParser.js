const ExcelJS = require('exceljs');

exports.parseExcel = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  
  const worksheet = workbook.worksheets[0];
  const fields = [];
  
  const headerRow = worksheet.getRow(1);
  
  headerRow.eachCell((cell, colNumber) => {
    if (cell.value) {
      const isMandatory = isRedFill(cell.fill);
      
      fields.push({
        column: colNumber,
        name: cell.value,
        mandatory: isMandatory,
        type: 'text',
        value: '',
        placeholder: isMandatory ? `${cell.value} (Wajib)` : cell.value
      });
    }
  });
  
  return fields;
};

function isRedFill(fill) {
  if (!fill) return false;
  
  if (fill.type === 'pattern') {
    const fgColor = fill.fgColor;
    if (fgColor && fgColor.argb) {
      const colorHex = fgColor.argb.toUpperCase();
      return colorHex.includes('FF0000') || colorHex === 'FFFF0000' || colorHex === 'FFCC0000';
    }
  }
  
  if (fill.type === 'solid') {
    const color = fill.fgColor;
    if (color && color.argb) {
      const colorHex = color.argb.toUpperCase();
      return colorHex.includes('FF0000') || colorHex === 'FFFF0000' || colorHex === 'FFCC0000';
    }
  }
  
  return false;
}

exports.isRedFill = isRedFill;
