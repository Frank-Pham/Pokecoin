import RequestApi from "../api/RequestApi";
import Endpoints from "../utils/constants/Endpoints";
export default class BlockchainService {
  static _blockchainServiceInstance = null;

  /**
   * Returns the blockChainService as a Singleton
   */
  static getInstance() {
    if (BlockchainService._blockchainServiceInstance == null)
      BlockchainService._blockchainServiceInstance = new BlockchainService();
    return this._blockchainServiceInstance;
  }

  async getLastBlockHash(token) {
    return await RequestApi.getInstance()
      .getRequest(Endpoints.DOMAIN + Endpoints.LASTBLOCK, token)
      .then((lastBlock) => lastBlock.hash);
  }

  async getDifficulty(token) {
    return await RequestApi.getInstance().getRequest(
      Endpoints.DOMAIN + Endpoints.DIFFICULTY,
      token
    );
  }
  /**
   * Builds a block with the hash of the previous block
   * @param {*} prevHash the hash of the previous block
   */
  buildBlock(prevHash) {
    const newBlock = {
      previousHash: prevHash,
      data: "Ich habe gar nix gemacht... Nur ein Bier getrunken 😓",
      timestamp: Date.now(),
      nonce: 0,
    };
    return newBlock;
  }

  /**
   * Calculates new hashes with the information of the block
   * @param {*} crypto imported crypto object
   * @param {*} block the information of a new block
   */
  buildHash(crypto, block) {
    const information =
      block.previousHash +
      block.timestamp.toString() +
      block.data +
      block.nonce.toString();
    return crypto.createHash("sha256").update(information).digest("hex");
  }
}
