import * as crypto from "crypto";

onmessage = (event) => {
  console.log("event", event);
  const validHash = getValidHash(event.data);
  postMessage(validHash);
};

function getValidHash(workerPackage) {
  const block = { ...workerPackage.block };

  const difficulty = workerPackage.difficulty;
  console.log("difficulty Im Worker", difficulty);
  let counter = 0;
  let hashCode = buildHash(block);
  const difficultyAsZeros = new Array(difficulty).fill(0).join("");
  while (hashCode.substring(0, difficulty) !== difficultyAsZeros) {
    if (block.nonce === Number.MAX_SAFE_INTEGER) {
      block.nonce = 0;
      block.timestamp = Date.now();
    }
    block.nonce += 1;
    hashCode = buildHash(block);
    counter += 1;
  }
  console.log("counter", counter);

  return block;
}

function buildHash(block) {
  const information =
    block.previousHash +
    block.timestamp.toString() +
    block.data +
    block.nonce.toString();
  return crypto.createHash("sha256").update(information).digest("hex");
}
