import React from "react";
import RESTConstans from "../../utils/constans/RESTConstans";

export function useLogin() {
  const login = async () => {
    const respons = await fetch(RESTConstans.DOMAIN + RESTConstans.LOGIN);
  };

  return null;
}
