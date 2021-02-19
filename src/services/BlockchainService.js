import axios from "axios";
import RequestApi from "../api/RequestApi";
import Endpoints from "../utils/constants/Endpoints";
export default class BlockchainService {
  static _blockchainServiceInstance = null;

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

  buildBlock(prevHash) {
    const newBlock = {
      previousHash: prevHash,
      data: "Ich habe gar nix gemacht... Nur ein Bier getrunken 😓",
      timestamp: Date.now(),
      nonce: 0,
    };
    return newBlock;
  }

  buildHash(crypto, block) {
    const information =
      block.previousHash +
      block.timestamp.toString() +
      block.data +
      block.nonce.toString();
    return crypto.createHash("sha256").update(information).digest("hex");
  }
}
