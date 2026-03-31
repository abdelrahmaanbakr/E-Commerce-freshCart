import { useState } from "react";
import { TokenContext } from "./TokenContext";

export default function TokenProvider({children}) {
  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null,
  );

  function logOut(){
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <TokenContext.Provider value={{ token, setToken,logOut }}>
      {children}
    </TokenContext.Provider>
  );
}
