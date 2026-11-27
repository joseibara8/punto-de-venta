"use client";

import { createContext, useContext } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children, usuario }) {
  return (
    <SessionContext.Provider value={usuario}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}