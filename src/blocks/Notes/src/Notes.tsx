import React, { Component } from 'react';
import NotesController, { Props } from './NotesController';
import SearchBox from '../../../components/SearchBox';

class Notes extends NotesController {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const { notes, currentNote, setCurrentNote } = this.context;
    
    return (
      <div style={{
        width: '300px',
        borderRight: '1px solid #ddd',
        height: '100%',
        overflow: 'auto'
      }}>
        <div style={{ padding: '15px' }}>
          <button
            onClick={this.createNewNote}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            + New Note
          </button>
        </div>
        
        <SearchBox />
        
        <div>
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => setCurrentNote(note)}
              style={{
                padding: '15px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                backgroundColor: currentNote?.id === note.id ? '#e3f2fd' : 'white'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px'
              }}>
                <strong>{note.title || 'No Title'}</strong>
                <span style={{
                  fontSize: '10px',
                  padding: '2px 5px',
                  borderRadius: '10px',
                     
                     background:note.synced ? '#d4edda' : '#fff3cd'
                }}>
                  {note.synced ? 'Synced' : 'Local'}
                </span>
              </div>
              <div style={{
                fontSize: '12px',
                color: '#666',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {note.content || 'Empty note'}
              </div>
              <div style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>
                {new Date(note.time).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const styles = {
  appContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    padding: '15px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    margin: 0
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  statusBadge: {
    padding: '5px 10px',
    borderRadius: '3px',
    fontSize: '12px'
  },
  syncingText: {
    fontSize: '12px'
  },
  syncButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  },
  mainContent: {
    flex: 1,
    display: 'flex'
  },
  notesList: {
    width: '300px',
    borderRight: '1px solid #ddd',
    height: '100%',
    overflow: 'auto'
  },
  newNoteContainer: {
    padding: '15px'
  },
  newNoteButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  },
  searchContainer: {
    padding: '15px'
  },
  searchInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    boxSizing: 'border-box' as const
  },
  notesContainer: {},
  noteItem: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer'
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px'
  },
  syncStatus: {
    fontSize: '10px',
    padding: '2px 5px',
    borderRadius: '10px'
  },
  notePreview: {
    fontSize: '12px',
    color: '#666',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const
  },
  noteDate: {
    fontSize: '10px',
    color: '#999',
    marginTop: '5px'
  },
  editor: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const
  },
  emptyEditor: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666'
  },
  editorHeader: {
    padding: '15px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleInput: {
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    flex: 1,
    outline: 'none'
  },
  editorControls: {
    display: 'flex',
    gap: '10px'
  },
  previewButton: {
    padding: '5px 10px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  },
  editorContent: {
    flex: 1,
    padding: '15px'
  },
  previewArea: {
    height: '100%',
    overflow: 'auto',
    lineHeight: '1.5'
  },
  contentTextarea: {
    width: '100%',
    height: '100%',
    border: '1px solid #ddd',
    borderRadius: '3px',
    padding: '10px',
    fontSize: '14px',
    resize: 'none' as const,
    outline: 'none',
    boxSizing: 'border-box' as const
  }
};

export default Notes;