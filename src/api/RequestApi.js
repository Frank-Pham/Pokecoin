import axios from "axios";

export default class RequestApi {
  static _requestApiInstance = null;

  static getInstance() {
    if (RequestApi._requestApiInstance == null)
      RequestApi._requestApiInstance = new RequestApi();
    return this._requestApiInstance;
  }

  async getRequest(url, token) {
    return await axios
      .get(url, token == null ? { headers: { token: token } } : null)
      .then((response) => response.data)
      .catch((error) => error.data);
  }

  async postRequest(url, body, token) {
    return await axios
      .post(url, body, token == null ? { headers: { token: token } } : null)
      .then((response) => response.data)
      .catch((error) => error.data);
  }
}
