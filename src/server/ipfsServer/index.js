import ipfsAPI from 'ipfs-http-client';
const ipfs = ipfsAPI({ host: 'localhost', port: '5001', protocol: 'http' });
export default ipfs;
