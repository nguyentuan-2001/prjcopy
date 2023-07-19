import React, { ReactNode, createContext, useState } from 'react';

interface MapContextProps {
    isList: boolean;
    setIsList: React.Dispatch<React.SetStateAction<boolean>>;

    isNavigation: boolean;
    setIsNavigation: React.Dispatch<React.SetStateAction<boolean>>;

    isSearch: boolean;
    setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
    
    isClose: boolean;
    setIsClose: React.Dispatch<React.SetStateAction<boolean>>;

    isClickImage: boolean;
    setIiClickImage: React.Dispatch<React.SetStateAction<boolean>>;

    isMap: boolean;
    setIsMap: React.Dispatch<React.SetStateAction<boolean>>;
}
interface PropsAuthContext {
    children: ReactNode;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

const MapProvider: React.FC<PropsAuthContext> = ({ children }) => {
    const [isList, setIsList] = useState(true); 
    const [isNavigation, setIsNavigation] = useState(true);
    const [isSearch, setIsSearch] = useState(true); 
    const [isClose, setIsClose] = useState(true); 
    const [isMap, setIsMap] = useState(true); 
    const [isClickImage, setIiClickImage] = useState<any>()
    const contextValue: MapContextProps = {
        isList,
        setIsList,
        isNavigation,
        setIsNavigation,
        isSearch,
        setIsSearch,
        isClose,
        setIsClose,
        isClickImage,
        setIiClickImage,
        isMap,
        setIsMap
    };

  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
