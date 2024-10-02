// ClientProvider.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import store from ".";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
