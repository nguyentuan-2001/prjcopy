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
    setIsClickImage: React.Dispatch<React.SetStateAction<boolean>>;

    isMap: boolean;
    setIsMap: React.Dispatch<React.SetStateAction<boolean>>;

    isBlockNavigation : boolean; 
    setIsBlockNavigation: React.Dispatch<React.SetStateAction<boolean>>;

    startValue: any;
    setStartValue: any;
    endValue: any;
    setEndValue: any

    isCoordinate: any, 
    setIsCoordinate: any

    isSwitchOn : boolean; 
    setIsSwitchOn: React.Dispatch<React.SetStateAction<boolean>>;

    isHover: any, 
    setIsHover: any,
}
interface PropsAuthContext {
    children: ReactNode;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

const MapProvider: React.FC<PropsAuthContext> = ({ children }) => {
    const [isList, setIsList] = useState(false); 
    const [isNavigation, setIsNavigation] = useState(true);
    const [isSearch, setIsSearch] = useState(true); 
    const [isClose, setIsClose] = useState(true); 
    const [isMap, setIsMap] = useState(true); 
    const [isClickImage, setIsClickImage] = useState<any>();
    const [isBlockNavigation, setIsBlockNavigation] = useState(false);
    const [startValue, setStartValue] = useState('');
    const [endValue, setEndValue] = useState('');
    const [isSwitchOn, setIsSwitchOn] = useState(true);

    const [isCoordinate, setIsCoordinate] = useState<any>();
    const [isHover, setIsHover] = useState(null)

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
        setIsClickImage,
        isMap,
        setIsMap,
        isBlockNavigation, 
        setIsBlockNavigation,
        startValue, 
        setStartValue,
        endValue,
        setEndValue,

        isCoordinate,
        setIsCoordinate,

        isSwitchOn,
        setIsSwitchOn,

        isHover, 
        setIsHover,

    };

  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
