import React from "react";
import Endpoints from "../../utils/constants/Endpoints";

export function useLogin() {
  const login = async () => {
    const respons = await fetch(Endpoints.DOMAIN + Endpoints.LOGIN);
  };

  return null;
}
