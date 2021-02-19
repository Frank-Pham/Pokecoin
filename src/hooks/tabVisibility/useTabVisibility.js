import { useState, useEffect } from "react";

export default function useTabVisibility() {
  const [tabVisibility, setTabVisibility] = useState(true);

  useEffect(() => {
    const handleVisbilityState = (isOpen) => setTabVisibility(isOpen);
    window.addEventListener(
      "visibilitychange",
      handleVisbilityState(!document.hidden),
    );

    return () => document.removeEventListener("visibilitychange", handleVisbilityState);
  });

  return tabVisibility;
}
