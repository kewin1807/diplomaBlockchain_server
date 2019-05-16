import multichainNode from '../../../server/multichainServer';
import express from 'express';
import { resolve } from 'url';

const router = express.Router();

router.get('/getInfo', (req, res) => {
  multichainNode
    .getInfo()
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
router.get('/address', (req, res) => {
  multichainNode
    .getAddresses()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});

router.get('/listPerm', (req, res) => {
  multichainNode
    .getAddresses()
    .then(response => {
      multichainNode
        .listPermissions({
          permissions: 'all',
          addresses: response[0]
        })
        .then(result => {
          res.send(result);
        });

      // const permissions = response.map(
      //   item =>
      //     new Promise((resolve, reject) => {
      //       const listPermissions = multichainNode.listPermissions({
      //         permissions: 'all',
      //         addresses: item
      //       });
      //       resolve({ permissions: listPermissions, address: item });
      //       setTimeout(() => {
      //         reject('fail promise');
      //       }, 1000);
      //     })
      // );
      // const lists = await Promise.all(permissions);
      // res.send(lists);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
router.post('/revoke', (req, res) => {
  const permission = req.body.permission;
  const address = req.body.address;
  multichainNode
    .revoke({
      addresses: '1Hhx5D4bGhRP2MLLH9cXoeiY8wbYZvvKQczYgF',
      permissions: 'issue'
    })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
router.post('/grant', (req, res) => {
  const permission = req.body.permission;
  const address = req.body.address;
  multichainNode
    .grant({
      addresses: '1Hhx5D4bGhRP2MLLH9cXoeiY8wbYZvvKQczYgF',
      permissions: 'issue'
    })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify(error));
    });
});
export default router;
