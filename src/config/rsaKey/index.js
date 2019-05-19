import cryptico from 'cryptico-js';

class RSAKey {
  init (address) {
    this.address = address;
  };
  generateKeyPair(){
    if (this.address) {
      this.RSAKey = cryptico.generateRSAKey(this.address, 1024);
    }
  };
  getKeyPair(){
    return this.RSAKey;
  };
}
export default new RSAKey();
