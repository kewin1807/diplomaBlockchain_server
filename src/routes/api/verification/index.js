import express from 'express';
import cryptico from 'cryptico-js';
import fs from 'fs';
import ipfsAPI from 'ipfs-http-client';
import multer from 'multer';
import multichainNode from '../../../server/multichainServer';
let router = express.Router();
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage: storage });

router.post('/checkValidate', upload.single('file'), (req, res, next) => {
  const data = fs.readFileSync(req.file.path);
  const address = req.body.address;
  return ipfs.add(data, (err, files) => {
    if (err) {
      return res.status(500).send({ message: 'Đã xảy ra lỗi' });
    }
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
    if (files) {
      const address = req.body.address;
      let str = `${files[0].hash}${address}`;
      const nameAsset = cryptico.hashSHA256(str);
      multichainNode.listAssets({ asset: nameAsset }).then(response => {
        if (response.length === 0) {
          res.status(400).send({ message: 'Không tìm thấy' });
        } else {
          res.send(response);
        }
      });
    }
  });
});
export default router;
