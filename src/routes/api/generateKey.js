import express from "express";
import cryptico from "cryptico-js";
import fs from "fs";
import ipfsAPI from "ipfs-http-client";
import multer from "multer";
var ipfs = ipfsAPI({ host: "localhost", port: "5001", protocol: "http" });

let router = express.Router();
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = multer({ storage: storage });

router.get("/getKey", (req, res, next) => {
  const PassPhrase = "The Moon is a Harsh Mistress.";
  const Bits = 1024;
  const MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
  res.send({
    publicKey: cryptico.publicKeyString(MattsRSAkey)
  });
});

router.post("/getFile", upload.single("file"), (req, res, next) => {
  const data = fs.readFileSync(req.file.path);
  return ipfs.add(data, (err, files) => {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
    if (files) {
      return res.json({
        hash: files[0].hash
      });
    }
  });
});
export default router;
