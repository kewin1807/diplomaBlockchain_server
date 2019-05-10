import config from '../../config';
import multichain from 'multichain-node';
const multichainNode = multichain(config.multichain);
export default multichainNode;
