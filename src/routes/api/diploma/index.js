import express from "express";
import fs from "fs";
import cryptico from "cryptico-js";

import pdfMakePrinter from "pdfmake/src/printer";
import TemplatePDF from "./templatePDF";
import multichainNode from "../../../server/multichainServer";
import ipfs from "../../../server/ipfsServer";
import RSAKey from "../../../config/rsaKey";
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
    let object = {};
    Object.keys(req.body).forEach(item => {
      if (item !== "publicKeyStudent" && item !== "address") {
        object = { ...object, ...{ [item]: req.body[item] } };
      }
    });
    // res.send(object)
    const docDefinition = TemplatePDF(object);
    const printer = new pdfMakePrinter(fonts);
    // create pdfs
    const doc = printer.createPdfKitDocument(docDefinition);
    doc.pipe(
      (creatStream = fs.createWriteStream("pdfs/test.pdf").on("error", err => {
        if (err) {
          res.status(500).send(JSON.stringify(err));
        }
      }))
    );
    let chunks = [];

    doc.on("data", chunk => {
      chunks.push(chunk);
    });
    doc.on("end", () => {
      const buffer = Buffer.concat(chunks);
      ipfs.add(buffer, (err, files) => {
        if (err) {
          return res.status(500).send({ message: "Đã xảy ra lỗi" });
        }
        if (files) {
          let link = `https://ipfs.io/ipfs/${files[0].hash}`;
          const linkEncrypt = cryptico.encrypt(link, req.body.publicKeyStudent);
          const linktoHex = Buffer.from(linkEncrypt.cipher, "utf8").toString(
            "hex"
          );
          const hashToHex = Buffer.from(files[0].hash, "utf8").toString("hex");
          const nameStream = `${object.idStudent}`;
          multichainNode
            .create({
              type: "stream",
              name: nameStream,
              open: false,
              details: {
                description: `${object.nameStudent} đã nhận được chứng chỉ từ ${
                  object.issueSource
                }`
              }
            })
            .then(() => {
              multichainNode
                .subscribe({
                  stream: nameStream
                })
                .then(async () => {
                  await multichainNode.publish({
                    stream: nameStream,
                    key: "key1",
                    data: hashToHex
                  });
                  await multichainNode.publish({
                    stream: nameStream,
                    key: "key2",
                    data: linktoHex
                  });
                  await multichainNode.publish({
                    stream: nameStream,
                    key: "key3",
                    data: { json: { ...object } }
                  });
                  res.send({ message: "Tạo chứng chỉ thành công" });
                })
                .catch(error => {
                  console.log(error);
                  res.status(500);
                });
            })
            .catch(error => {
              console.log(error);
              res.status(500);
            });
        }
      });
    });
    doc.end();
  } catch (err) {
    throw err;
  }
});
router.get("/all-diploma", (req, res) => {
  multichainNode
    .listStreams()
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});

router.post("/get-diploma-info", (req, res) => {
  const streamName = req.body.streamName;
  multichainNode
    .subscribe({ stream: streamName })
    .then(() => {
      multichainNode.listStreamItems({ stream: streamName }).then(response => {
        console.log("response", response);
        let link = "";
        if (response.length !== 0) {
          const info = response[2].data.json;
          const hexToLink = Buffer.from(response[1].data, "hex").toString(
            "utf8"
          );

          if (RSAKey.getKeyPair()) {
            link = cryptico.decrypt(hexToLink, RSAKey.getKeyPair()).plaintext;
          }
          return res.send({ info: info, link: link });
        }
        return res.send({ info: null, link: link });
      });
    })
    .catch(error => {
      res.status(500).send({ message: "Đã có lỗi xảy ra" });
      console.log(error);
    });
});

export default router;
