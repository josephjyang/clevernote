import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadNotebooks } from '../../store/notebooks';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import './Notebooks.css'

function Notebooks({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks)
    const userNotebooks = Object.values(notebooks);
    userNotebooks.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    })

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) dispatch(loadNotebooks(user));
        else return;
    }, [dispatch, user]);

    return (
        <div id="notebooks-content">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
            {userNotebooks.map(notebook => {
                const date = new Date(notebook.updatedAt);
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                return (
                    <ul>
                        <Link key={notebook.id} to={`/notes/${notebook.id}`}>
                            <div className="notebook-block">
                                <h3>
                                    {notebook.name}
                                </h3>
                                <p id="notebook-update-time">
                                    {`${date.toLocaleDateString('en-US', options)}`}
                                </p>
                            </div>
                        </Link>
                    </ul>
                )
            })}
        </div>
    );
}

export default Notebooks