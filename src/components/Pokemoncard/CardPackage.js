import axios from "axios";
import Endpoints from "../../utils/constants/Endpoints";

export default class CardPackage {
  constructor(name, length, cards, rarity, cost) {
    this.name = name;
    this.length = length;
    this.cards = cards;
    this.rarity = rarity;
    this.cost = cost;
  }

  async fetchCards(token) {
    const cardUrl = Endpoints.DOMAIN + Endpoints.CARDS;

    await axios
      .get(cardUrl, {
        headers: {
          token: token,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }
}
