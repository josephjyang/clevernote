import React, { useState } from 'react';
import NoteForm from "./NoteForm"
import { NoteModal } from "../../context/NoteModal"
import './LoginForm.css'

function NoteFormModal() {
    const [showNote, setShowNote] = useState(false);

    return (
        <>
            <i class="fas fa-file-alt" onClick={() => setShowNote(true)}></i>
            {showNote && (
                <NoteModal onClose={() => setShowNote(false)}>
                    <NoteForm />
                </NoteModal>
            )}
        </>
    )
}

export default NoteFormModal