import React, { useEffect } from "react";

export default function CardDetails() {
  useEffect(() => {
    console.log("SHOW MEEEEE");
  }, []);
  return (
    <div>
      <h1>HALLO DETAILS</h1>
    </div>
  );
}
