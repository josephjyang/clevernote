import React, { useContext, useRef, useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom';
import './FormModal.css';

const DeleteModalContext = createContext();

export const DeleteModalProvider = ({ children }) => {
    const deleteModalRef = useRef();
    const [deleteValue, setDeleteValue] = useState();

    useEffect(() => {
        setDeleteValue(deleteModalRef.current)
    }, [deleteModalRef])

    return (
        <>
            <DeleteModalContext.Provider value={deleteValue}>
                {children}
            </DeleteModalContext.Provider>
            <div ref={deleteModalRef} />
        </>
    )
}

export const DeleteModal = ({ onClose, children }) => {
    const deleteModalNode = useContext(DeleteModalContext);
    if (!deleteModalNode) return null;

    return ReactDOM.createPortal(
        <div id="form-modal">
            <div id="form-modal-background" onClick={onClose} />
            <div id="form-modal-content">
                {children}
            </div>
        </div>
        , deleteModalNode)
}