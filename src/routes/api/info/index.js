import multichainNode from "../../../server/multichainServer";
import express from "express";

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

router.get("/listPerm", (req, res) => {
  const address = req.body.address;
  multichainNode
    .listPermissions({ permissions: "all", addresses: address })
    .then(data => {
      res.send(data);
    })
    .catch(error=> {
      res.status(500).send(JSON.stringify(error));
    });
});
export default router;
