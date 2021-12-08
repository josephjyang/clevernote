import React, { useContext, useRef, useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom';
import './FormModal.css';

const FormModalContext = createContext();

export const FormModalProvider = ({ children }) => {
    const formModalRef = useRef();
    const [formValue, setFormValue] = useState();

    useEffect(() => {
        setFormValue(formModalRef.current)
    }, [formModalRef])

    return (
        <>
            <FormModalContext.Provider value={formValue}>
                {children}
            </FormModalContext.Provider>
            <div ref={formModalRef} />
        </>
    )
}

export const FormModal = ({ onClose, children }) => {
    const formModalNode = useContext(FormModalContext);
    if (!formModalNode) return null;

    return ReactDOM.createPortal(
        <div id="form-modal">
            <div id="form-modal-background" onClick={onClose} />
            <div id="form-modal-content">
                {children}
            </div>
        </div>
        , formModalNode)
}