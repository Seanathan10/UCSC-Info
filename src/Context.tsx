import {createContext} from 'react';

export interface ContextType {
    mobile: boolean | undefined;
    drawer: boolean;
    drawerFunction: (value: boolean) => void;
    desktopMenuHeight: number;
    setDesktopMenuHeight: (value: number) => void;
}

export const Context = createContext<ContextType | null>(null);