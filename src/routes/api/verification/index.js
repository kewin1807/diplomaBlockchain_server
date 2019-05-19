import express from "express";
import cryptico from "cryptico-js";
import fs from "fs";
import ipfs from "../../../server/ipfsServer";
import multer from "multer";
import multichainNode from "../../../server/multichainServer";
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

router.post("/checkValidate", upload.single("file"), (req, res, next) => {
  const data = fs.readFileSync(req.file.path);
  ipfs.add(data, (err, files) => {
    if (err) {
      return res.status(500).send({ message: "Đã xảy ra lỗi" });
    }

    if (files) {
      const hashToHex = Buffer.from(files[0].hash, "utf8").toString("hex");
      multichainNode
        .subscribe({ stream: req.body.idStudent })
        .then(() => {
          multichainNode
            .listStreamItems({ stream: req.body.idStudent })
            .then(result => {
              if (result.length > 0) {
                if (hashToHex === result[0].data) {
                  res.send({ info: result[2].data.json });
                }
              } else {
                res.send({ message: "Không tìm thấy chứng chỉ trên " });
              }
            })
            .catch(error => {
              res
                .status(500)
                .send({ message: "Không tìm thấy chứng chỉ trên " });
            });
        })
        .catch(error => {
          res.status(500).send({ message: "Không tìm thấy chứng chỉ trên " });
        });
    }
  });
});
export default router;
