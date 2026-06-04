const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');
const path = require('path');

exports.generateDocument = async (formData, format = 'docx') => {
  try {
    const downloadsDir = path.join(__dirname, '../downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const processedData = replaceRDKK(formData);
    const doc = createDocument(processedData);

    const timestamp = new Date().getTime();
    const filename = `e-RDKK-${timestamp}.${format === 'pdf' ? 'pdf' : 'docx'}`;
    const filepath = path.join(downloadsDir, filename);

    const docBytes = await Packer.toBuffer(doc);
    fs.writeFileSync(filepath, docBytes);

    console.log(`✓ Document generated: ${filename}`);
    return filepath;
  } catch (error) {
    console.error('Document generation error:', error);
    throw error;
  }
};

function replaceRDKK(data) {
  const processed = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      processed[key] = value.replace(/RDKK/g, 'e-RDKK');
    } else {
      processed[key] = value;
    }
  }
  return processed;
}

function createDocument(data) {
  const rows = [];
  
  rows.push(
    new Paragraph({
      text: 'e-RDKK GONDANG',
      bold: true,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      size: 28
    })
  );

  const tableRows = [];
  
  Object.entries(data).forEach(([key, value]) => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(key)],
            borders: {
              top: { style: BorderStyle.SINGLE },
              bottom: { style: BorderStyle.SINGLE },
              left: { style: BorderStyle.SINGLE },
              right: { style: BorderStyle.SINGLE }
            },
            width: { size: 2500, type: 'dxa' }
          }),
          new TableCell({
            children: [new Paragraph(String(value || ''))],
            borders: {
              top: { style: BorderStyle.SINGLE },
              bottom: { style: BorderStyle.SINGLE },
              left: { style: BorderStyle.SINGLE },
              right: { style: BorderStyle.SINGLE }
            },
            width: { size: 3500, type: 'dxa' }
          })
        ]
      })
    );
  });

  const table = new Table({
    width: { size: 100, type: 'pct' },
    rows: tableRows
  });

  rows.push(table);

  return new Document({
    sections: [{
      children: rows
    }]
  });
}

exports.replaceRDKK = replaceRDKK;
