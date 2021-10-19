import React, { useState, useEffect } from "react";
import { store } from "../App";

const Structure = () => {
  const [list, setList] = useState(store._array);

  useEffect(() => {
    setList(store._array);
  }, []);

  return <div></div>;
};

export default Structure;
