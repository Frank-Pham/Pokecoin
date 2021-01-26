import axios from "axios";
import RESTConstans from "../utils/constans/RESTConstans";

export default class CardPackage {
  constructor(name, length, cards, rarity, cost) {
    this.name = name;
    this.length = length;
    this.cards = cards;
    this.rarity = rarity;
    this.cost = cost;
  }
  /*
  async fetchData(url, token) {
    await axios
      .get(url, {
        headers: {
          token: token,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }*/

  async fetchCards(token) {
    /*const cards = await fetchData(
      RESTConstans.DOMAIN + RESTConstans.CARDS,
      token
    );*/

    const cardUrl = RESTConstans.DOMAIN + RESTConstans.CARDS;

    const cards = await axios
      .get(cardUrl, {
        headers: {
          token: token,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });

    console.log(cards);
  }
}
