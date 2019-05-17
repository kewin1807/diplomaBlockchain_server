import multichainNode from "../../../server/multichainServer";
import express from "express";
import { resolve } from "url";

const router = express.Router();

router.get("/getInfo", (req, res) => {
  multichainNode
    .getInfo()
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
router.get("/address", (req, res) => {
  multichainNode
    .getAddresses()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});

router.get("/listPerm", (req, res) => {
  multichainNode
    .getAddresses()
    .then(response => {
      multichainNode
        .listPermissions({
          permissions: "all",
          addresses: response[0]
        })
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
router.post("/revoke", (req, res) => {
  let permissions = JSON.parse(req.body.permissions);
  let str = "";
  for (let i = 0; i < permissions.length; i++) {
    if (i === permissions.length - 1) {
      str += `${permissions[i]}`;
      break;
    }
    str += `${permissions[i]},`;
  }
  const address = req.body.address;
  multichainNode
    .revoke({
      addresses: address,
      permissions: str
    })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
router.post("/grant", (req, res) => {
  let permissions = JSON.parse(req.body.permissions);
  let str = "";
  for (let i = 0; i < permissions.length; i++) {
    if (i === permissions.length - 1) {
      str += `${permissions[i]}`;
      break;
    }
    str += `${permissions[i]},`;
  }
  const address = req.body.address;
  multichainNode
    .grant({
      addresses: address,
      permissions: str
    })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
export default router;
