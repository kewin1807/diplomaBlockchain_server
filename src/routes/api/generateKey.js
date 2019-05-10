import express from 'express';
import cryptico from 'cryptico-js';
import fs from 'fs';
import IPFS from 'ipfs';
const node = new IPFS();
let router = express.Router();

router.get('/getKey', (req, res, next) => {
  const PassPhrase = 'The Moon is a Harsh Mistress.';
  const Bits = 1024;
  const MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
  res.send({
    publicKey: cryptico.publicKeyString(MattsRSAkey)
  });
});

router.get('/getFile', (req, res, next) => {
  let testFile = fs.readFileSync(
    '/Users/tienthanh/Desktop/poiter_summarize.pdf'
  );
  let testBuffer = Buffer.from(testFile);
  node.on('ready', async () => {
    const version = await node.version();

    console.log('Version:', version.version);

    const filesAdded = await node.add({
      path: '/Users/tienthanh/Desktop/poiter_summarize.pdf',
      content: testBuffer
    });
    res.send({ filePath: filesAdded[0].path, hash: filesAdded[0].hash });

    // console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)

    // const fileBuffer = await node.cat(filesAdded[0].hash)

    // console.log('Added file contents:', fileBuffer.toString())
  });
});

export default router;
