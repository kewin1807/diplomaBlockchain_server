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
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
router.post("/revoke", (req, res) => {
  const permission = req.body.permission;
  const address = req.body.address;
  multichainNode
    .revoke({ addresses:"1Hhx5D4bGhRP2MLLH9cXoeiY8wbYZvvKQczYgF", permissions: "issue" })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
router.post("/grant", (req, res) => {
  const permission = req.body.permission;
  const address = req.body.address;
  multichainNode
    .grant({ addresses:"1Hhx5D4bGhRP2MLLH9cXoeiY8wbYZvvKQczYgF", permissions: "issue" })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
export default router;
