import React, { Component } from 'react';
import { AppContext } from '../global/AppContext';
import { AppContextType } from '../global/types';

export class Header extends Component {
  static contextType = AppContext;
  context!: AppContextType;

  render(): React.ReactNode {
    const { isOnline, isSyncing, syncNotes } = this.context;
    
    return (
      <div style={{
        padding: '15px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#dd1e71',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0 ,color:"white"}}>Notes</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            padding: '5px 10px',
            borderRadius: '3px',
            fontSize: '12px',
            backgroundColor: isOnline ? 'green' : 'red',
            color: "white"
          }}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
          {isSyncing && <span style={{ fontSize: '12px' }}>Syncing...</span>}
          {isOnline && (
            <button
              onClick={syncNotes}
              style={{
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Sync Now
            </button>
          )}
        </div>
      </div>
    );
  }
}