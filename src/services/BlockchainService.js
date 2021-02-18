import axios from "axios";
import Constans from "../utils/constants/Endpoints";

export default class BlockchainService {
  static blockchainServiceInstance = null;
  static getInstance() {
    if (BlockchainService.blockchainServiceInstance == null) {
      BlockchainService.blockchainServiceInstance = new BlockchainService();
    }
    return this.blockchainServiceInstance;
  }

  async fetchDifficulty(token){
    return await axios
      .get(Constans.DOMAIN + Constans.DIFFICULTY, {
        headers: {
          token: token,
        },
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  async fetchLastBlockHash(token){
    return await axios
      .get(Constans.DOMAIN + Constans.LASTBLOCK, {
        headers: {
          token: token,
        },
      })
      .then((response) => response.data.hash)
      .catch((error) => console.log(error));
  };

  buildBlock(prevHash) {
    const newBlock = {
      previousHash: prevHash,
      data: "Ich habe gar nix gemacht... Nur ein Bier getrunken 😓",
      timestamp: Date.now(),
      nonce: 0,
    };
    return newBlock;
  }
}
