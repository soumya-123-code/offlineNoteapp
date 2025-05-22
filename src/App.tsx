import React, { Component } from 'react';
import { AppProvider } from './global/AppContext';
import { Header } from '../src/components/Header';
import  Notes  from '../src/blocks/Notes/src/Notes';
import Noteedit  from '../src/blocks/Noteedit/src/Noteedit';

class App extends Component {
  render(): React.ReactNode {
    return (
      <AppProvider>
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Arial, sans-serif'
        }}>
          <Header />
          <div style={{ flex: 1, display: 'flex' }}>
            <Notes />
            <Noteedit />
          </div>
        </div>
      </AppProvider>
    );
  }
}

export default App;