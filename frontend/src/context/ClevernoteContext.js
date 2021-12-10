import { createContext, useState, useContext } from 'react';

export const ClevernoteContext = createContext();

export const usePage = () => {
    return useContext(ClevernoteContext)
}


export default function ClevernoteProvider({ children }) {
    const [page, setPage] = useState('dashboard');
    const [noteId, setNoteId] = useState(false);
    const [notebookId, setNotebookId] = useState(false);
    const [scratchContent, setScratchContent] = useState();

    return (
        <ClevernoteContext.Provider value={{ page, setPage, noteId, setNoteId, notebookId, setNotebookId, scratchContent, setScratchContent }}>
            { children }
        </ClevernoteContext.Provider>
    );
}
