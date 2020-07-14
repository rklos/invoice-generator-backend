// @ts-ignore
import * as PDFPrinter from 'pdfmake';
import * as path from 'path';

const fonts = {
  Roboto: {
    normal: path.resolve(__dirname, 'fonts', 'Roboto-Regular.ttf'),
    bold: path.resolve(__dirname, 'fonts', 'Roboto-Medium.ttf'),
    italics: path.resolve(__dirname, 'fonts', 'Roboto-Italic.ttf'),
    bolditalics: path.resolve(__dirname, 'fonts', 'Roboto-MediumItalic.ttf')
  }
};
const printer = new PDFPrinter(fonts);

export default class Generator {
  constructor(private data: any) {}
  generate(): Promise<Buffer> {
    return new Promise((resolve) => {
      this.getBuffer(resolve);
    });
  }

  private getBuffer(resolve: (value: Buffer) => void) {
    let result;
    const chunks: any[] = [];
    const doc = printer.createPdfKitDocument({
      content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
      ]
    });
    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });
    doc.on('end', () => {
      result = Buffer.concat(chunks);
      resolve(result);
    });
    doc.end();
  }
}