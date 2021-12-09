import { createContext, useState, useContext } from 'react';

export const ClevernoteContext = createContext();

export const usePage = () => {
    return useContext(ClevernoteContext)
}


export default function ClevernoteProvider({ children }) {
    const [page, setPage] = useState('dashboard');
    const [noteId, setNoteId] = useState(false)

    return (
        <ClevernoteContext.Provider value={{ page, setPage, noteId, setNoteId }}>
            { children }
        </ClevernoteContext.Provider>
    );
}
