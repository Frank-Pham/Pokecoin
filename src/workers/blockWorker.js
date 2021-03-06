import * as crypto from "crypto";
import BlockchainService from "../services/BlockchainService";

const blockchainService = BlockchainService.getInstance();
onmessage = async (event) => {
  console.log("event", event.data);
  const difficulty = await blockchainService.getDifficulty(event.data);
  const lastBlockHash = await blockchainService.getLastBlockHash(event.data);
  const block = blockchainService.buildBlock(lastBlockHash);
  const validHash = await getValidHash({
    block: block,
    difficulty: difficulty,
  });
  postMessage(validHash);
};

async function getValidHash(workerPackage) {
  const block = { ...workerPackage.block };

  const difficulty = workerPackage.difficulty;

  let hashCode = blockchainService.buildHash(crypto, block);
  const difficultyAsZeros = new Array(difficulty).fill(0).join("");
  while (hashCode.substring(0, difficulty) !== difficultyAsZeros) {
    if (block.nonce === Number.MAX_SAFE_INTEGER) {
      block.nonce = 0;
      block.timestamp = Date.now();
    }
    block.nonce += 1;
    hashCode = blockchainService.buildHash(crypto, block);
  }
  return block;
}
