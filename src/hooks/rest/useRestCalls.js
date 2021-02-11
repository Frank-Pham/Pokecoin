import RESTConstans from "../../utils/constans/RESTConstans";
import axios from "axios";
import { UserContext } from "../../context/user/UserContext";
import { useContext } from "react";

const useRestCalls = () => {
  const fetchData = async (url, token) => {
    if (token && token.length > 0) {
      const response = await axios
        .get(url, {
          headers: {
            token: token,
          },
        })
        .then((response) => response.data)
        .catch((error) => console.log(error.message));

      return response;
    }
    return null;
  };

  /**
   * Coins-amount wird gefecht und im State gespeichert
   */
  const getCoins = async (token) => {
    const data = await fetchData(
      RESTConstans.DOMAIN + RESTConstans.COINS,
      token
    );
    if (data !== null && data !== undefined) {
      return data.amount;
    }
    return 0;
  };

  return { getCoins };
};

export default useRestCalls;
