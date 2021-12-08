import { createContext, useState, useContext } from 'react';

export const ClevernoteContext = createContext();

export const usePage = () => {
    return useContext(ClevernoteContext)
}

export default function ClevernoteProvider({ children }) {
    const [page, setPage] = useState('dashboard');

    return (
        <ClevernoteContext.Provider value={{ page, setPage }}>
            { children }
        </ClevernoteContext.Provider>
    );
}
