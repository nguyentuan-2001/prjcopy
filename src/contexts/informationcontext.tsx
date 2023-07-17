import React, { ReactNode, createContext, useState } from 'react';

interface MapContextProps {
    isTransform: boolean;
    setIsTransform: React.Dispatch<React.SetStateAction<boolean>>;
}
interface PropsAuthContext {
    children: ReactNode;
}

const IfContext = createContext<MapContextProps | undefined>(undefined);

const IfProvider: React.FC<PropsAuthContext> = ({ children }) => {
    const [isTransform, setIsTransform] = useState(false); 

    const contextValue: MapContextProps = {
        isTransform,
        setIsTransform,
    };

  return (
    <IfContext.Provider value={contextValue}>
      {children}
    </IfContext.Provider>
  );
};

export { IfProvider, IfContext };
