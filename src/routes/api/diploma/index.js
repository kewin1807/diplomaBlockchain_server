import express from "express";
import fs from "fs";
import templatePDF from "./templatePDF";
const pdfMakePrinter = require("pdfmake/src/printer");
const router = express.Router();
const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf"
  }
};
router.post("/create-diploma", (req, res) => {
  const printer = new pdfMakePrinter(fonts);
  var docDefinition = {
    content: [
      "First paragraph",
      "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"
    ]
  };

  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream("pdfs/basics.pdf"));
  pdfDoc.end();
});
export default router;
