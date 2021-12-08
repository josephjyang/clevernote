import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadNotebooks } from '../../store/notebooks';
import { Link, Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import NewNotebookForm from '../NewNotebookForm'
import { FormModal } from '../../context/FormModal';
import './Notebooks.css'

function Notebooks({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const [showForm, setShowForm] = useState(false)
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) dispatch(loadNotebooks(user));
        else return;
    }, [dispatch, user]);
    
    if (!user) return (
        <Redirect to="/" />
    )
    
    return (
        <div id="notebooks-content">
            <Navigation isLoaded={isLoaded}/>
            <div id="notebooks-page">
                <h2>Notebooks</h2>
                <button id="edit-notebook-link" onClick={() => setShowForm(true)}>New Notebook</button>
                {showForm && (
                    <FormModal onClose={() => setShowForm(false)}>
                        <NewNotebookForm hideForm={() => setShowForm(false)} />
                    </FormModal>
                )}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userNotebooks.map(notebook => {
                            const updateDate = new Date(notebook.updatedAt);
                            const createDate = new Date(notebook.createdAt);
                            const options = { year: 'numeric', month: 'short', day: 'numeric' };
                            return (
                                <tr key={notebook.id}>
                                    <td>
                                    <Link to={`/notebooks/${notebook.id}`}>
                                            <h3>
                                                {notebook.name}
                                            </h3>
                                    </Link>
                                    </td>
                                    <td className="notebook-update-time">
                                        {`${updateDate.toLocaleDateString('en-US', options)}`}
                                    </td>
                                    <td className="notebook-create-time">
                                        {`${createDate.toLocaleDateString('en-US', options)}`}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Notebooks