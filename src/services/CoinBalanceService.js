import RequestApi from "../api/RequestApi";
import Endpoints from "../utils/constants/Endpoints";

export default class CoinBalanceService {
  static _coinBalanceServiceInstance = null;
  static _requestApi = RequestApi.getInstance();

  /**
   * Returns the coinBalanceService as a Singleton
   */
  static getInstance() {
    if (CoinBalanceService._coinBalanceServiceInstance == null)
      CoinBalanceService._coinBalanceServiceInstance = new CoinBalanceService();
    return this._coinBalanceServiceInstance;
  }

  /**
   * This function returns the coins of an User
   * @param {*} token token of the user
   */
  async getCoins(token) {
    return await CoinBalanceService._requestApi
      .getRequest(Endpoints.DOMAIN + Endpoints.COINS, token)
      .then((response) => response.amount);
  }
}
