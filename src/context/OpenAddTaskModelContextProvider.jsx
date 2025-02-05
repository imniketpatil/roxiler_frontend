import React, { useState } from "react";
import MonthContext from "./MonthContext";

const MonthContextProvider = ({ children }) => {
  const [month, setMonth] = useState(3);
  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      {children}
    </MonthContext.Provider>
  );
};

export default MonthContextProvider;
