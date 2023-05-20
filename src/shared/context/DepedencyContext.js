import { createContext, useContext } from "react";

const DependecyContext = createContext({});

export const DependecyProvider = ({ children, services }) => {
  return (
    <DependecyContext.Provider value={services}>
      {children}
    </DependecyContext.Provider>
  );
};

export const useDeps = () => {
  return useContext(DependecyContext);
};
