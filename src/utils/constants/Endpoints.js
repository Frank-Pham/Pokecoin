const Endpoints = {
  DOMAIN: "https://rocky-lowlands-35145.herokuapp.com",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",
  CHANGE_PASSWORD: "/auth/changePassword",
  COINS: "/wallet/balance",
  LASTBLOCK: "/blockchain/lastBlock",
  BLOCKS: "/blockchain/blocks",
  DIFFICULTY: "/blockchain/currentDifficulty",
  PACKAGES: "/cards/packages",
  CARDS: "/cards",
  USERCARDS: "/cards/usercards",
  DEFAULT_PACK: "/buyDefaultPackage",
};

export default Endpoints;
