import axios from "axios";

export default class RequestApi {
  static _requestApiInstance = null;

  /**
   * Returns the requestApi object as a Singleton
   */
  static getInstance() {
    if (RequestApi._requestApiInstance == null)
      RequestApi._requestApiInstance = new RequestApi();
    return this._requestApiInstance;
  }

  /**
   * Sends a get request to the url
   * @param {*} url the url where the get request is send to
   * @param {*} token token of the user
   */
  async getRequest(url, token) {
    return await axios
      .get(url, token != null ? { headers: { token: token } } : {})
      .then((response) => response.data)
      .catch((error) => error.data);
  }

  /**
   * Sends a post request to the url
   * @param {*} url the url where the get request is send to
   * @param {*} body the requestbody
   * @param {*} token token of the user
   */
  async postRequest(url, body, token) {
    return await axios.post(
      url,
      body,
      token != null ? { headers: { token: token } } : {}
    );
  }
}
