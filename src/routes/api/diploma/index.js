import express from 'express';
import fs from 'fs';
import cryptico from 'cryptico-js';

import pdfMakePrinter from 'pdfmake/src/printer';
import TemplatePDF from './templatePDF';
import multichainNode from '../../../server/multichainServer';
import ipfs from '../../../server/ipfsServer';
// import RSAKey from '../../../config/rsaKey'
const router = express.Router();

router.post('/create-diploma', (req, res) => {
  try {
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
      }
    };
    let creatStream;
    const object ={};
    Object.keys(req.body).forEach((item) => {
      if(item!==='publicKeyStudent'){
        object[item] = req.body[item]
      }
    })
    const docDefinition = TemplatePDF(object);
    const printer = new pdfMakePrinter(fonts);
   // create pdfs
    const doc = printer.createPdfKitDocument(docDefinition);
    doc.pipe(
      (creatStream = fs.createWriteStream('pdfs/test.pdf').on('error', err => {
        if (err) {
          res.status(500).send(JSON.stringify(err));
        }
      }))
    );
    doc.on('end', () => {
      const data = fs.readFileSync('pdfs/test.pdf');
      ipfs.add(data, (err, files) => {
        if (err) {
          return res.status(500).send({ message: 'Đã xảy ra lỗi' });
        }
        if (files) {
          const address = req.body.address;
          let str = `${files[0].hash}${address}`;
          const nameAsset = cryptico.hashSHA256(str);
          // save in a issue
          multichainNode.issue({
            address: address
            asset: nameAsset,
            qty: 100,
            units: 1,
            details:object
          });
          .then(async (res)=> {
              const IPFSLink = `https://ipfs.io/ipfs/${files[0].hash}`
              //encrypt IPFS link with publickey student
               const EncryptionResult = cryptico.encrypt(IPFSLink, req.body.publicKeyStudent);
               const hex = EncryptionResult.cipher.hexEncode();
               const transactionID = await multichainNode.sendwithData({address: address, amount: {nameAsset : 1}, data:hex})
               multichainNode.create({name: `${req.body.nameStudent}-${files[0].hash}`, open:false}).then(() => {
                 multichainNode.publish({stream: `${req.body.nameStudent}-${files[0].hash}`, key: "letters", data:transactionID}).then(() => {
                   res.send({"message" : "Tạo chứng chỉ thành công"})
                 })
               })
          }).catch((error) => {
            res.status(500).send(JSON.stringify(err));
          })
        }
      });
    });
  } catch (err) {
    throw err;
  }
});
router.get('/all-diploma', (req, res) => {
  multichainNode.listStreams().then((response) => {
    res.send(response)
  })
  .catch(error => {
    res.status(500).send(JSON.stringify(error))
  })
})

router.post('/get-diploma-file', (req, res) => {
 const streamName = req.body.streamName;
 multichainNode.subscribe({stream: streamName}).then(() => {
    multichainNode.listStreamItems({stream: streamName}).then((response) => {
        multichainNode.getWalletTransaction({txid: response[0].data}).then((result) => {
           res.send({link: result.data[0]})
        })
    })
 })
 .catch((error) => {
   res.status(500).send({'message' : 'Đã có lỗi xảy ra'})
 })
})

export default router;
