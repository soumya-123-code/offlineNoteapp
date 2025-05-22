import React, { Component } from 'react';
import { AppContext } from '../global/AppContext';
import { AppContextType } from '../global/types';

export default class SearchBox extends Component {
  static contextType = AppContext;
  context!: AppContextType;

  render(): React.ReactNode {
    const { searchTerm, setSearchTerm } = this.context;
    
    return (
      <div style={{ padding: '15px' }}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            boxSizing: 'border-box'
          }}
        />
      </div>
    );
  }
}