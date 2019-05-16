import express from "express";
import fs from "fs";
import pdfMakePrinter from "pdfmake/src/printer";
import TemplatePDF from "./templatePDF";

const router = express.Router();
router.post("/create-diploma", (req, res) => {
  try {
    const fonts = {
      Roboto: {
        normal: "fonts/Roboto-Regular.ttf",
        bold: "fonts/Roboto-Medium.ttf",
        italics: "fonts/Roboto-Italic.ttf",
        bolditalics: "fonts/Roboto-MediumItalic.ttf"
      }
    };
    let creatStream;
    const docDefinition = TemplatePDF(req.body);
    const printer = new pdfMakePrinter(fonts);
    const doc = printer.createPdfKitDocument(docDefinition);
    doc.pipe(
      (creatStream = fs.createWriteStream("pdfs/test.pdf").on("error", err => {
        if (err) {
          res.status(500).send(JSON.stringify(err));
        }
      }))
    );
    doc.on("end", () => {
      res.send({ message: "DONE" });
    });
    doc.end();
  } catch (err) {
    throw err;
  }
});
router.get("/download", (req, res) => {
  res.download("pdfs/test.pdf", err => {
    res.status(500);
  });
});

export default router;
