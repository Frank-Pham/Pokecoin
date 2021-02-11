import React, { useContext, useState, useEffect } from "react";

export default function Mining() {
  const [block, setblock] = useState({
    previousHash: "",
    data: "Als Anna abends aß, aß Anna abends Ananas.",
    timestamp: Date.now(),
    nonce: 0,
  });
}
