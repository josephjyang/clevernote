import React, { useEffect } from 'react';
import { useLocation, NavLink, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NoteForm from '../NoteForm';
import * as notesActions from '../../store/notes'

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function SearchPage({isLoaded}) {
  const sessionUser = useSelector(state => state.session.user); 

  const notes = useSelector(state => state.notes); 
  const userNotes = Object.values(notes);
  userNotes.sort((a, b) => {
    return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
  })
  console.log(notes);

  let query = useQuery();
  const searchKey = query.get("key");

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(notesActions.searchNotes({ user: sessionUser, searchTerms: searchKey }))
  }, [dispatch, searchKey, sessionUser])

  return (
    <div id='notes-sidebar'>
      <div id="notes-sidebar-header">
        <h2>
          <i className="fas fa-file-alt" /> "{searchKey}" Notes
        </h2>
        <p>
          {userNotes.length} notes
        </p>
      </div>
      { userNotes && userNotes.map(note => {
        const date = new Date(note.updatedAt);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return (
          <NavLink key={note.id} to={`/notes/${note.id}`} className="notebook-block">
            <h3>
              {note.name}
            </h3>
            <p id="notebook-block-content">
              {note.content}
            </p>
            <p id="notebook-update-time">
              {`${date.toLocaleDateString('en-US', options)}`}
            </p>
          </NavLink>
        )
      })}
    </div>
  )
}

export default SearchPage;