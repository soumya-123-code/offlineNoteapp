import React, { Component, createContext } from 'react';
import { AppContextType, AppProviderProps, AppProviderState, Note } from './types';
import { storage } from './storage';
import { api } from './api';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export class AppProvider extends Component<AppProviderProps, AppProviderState> {
  private saveTimer: NodeJS.Timeout | null = null;

  constructor(props: AppProviderProps) {
    super(props);
    this.state = {
      notes: [],
      currentNote: null,
      searchTerm: '',
      isOnline: navigator.onLine,
      isSyncing: false
    };
  }

  componentDidMount(): void {
    this.loadNotes();
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount(): void {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  componentDidUpdate(prevProps: AppProviderProps, prevState: AppProviderState): void {
    if (prevState.isOnline === false && this.state.isOnline === true) {
      this.syncNotes();
    }
  }

  handleOnline = (): void => {
    this.setState({ isOnline: true });
  }

  handleOffline = (): void => {
    this.setState({ isOnline: false });
  }

  loadNotes = async (): Promise<void> => {
    try {
      const notes = await storage.getAll();
      this.setState({
        notes: notes.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      });
    } catch (error) {
      console.log(error);
    }
  }

  saveNote = async (note: Note): Promise<void> => {
    try {
      await storage.save(note);
      this.setState(prevState => {
        const otherNotes = prevState.notes.filter(n => n.id !== note.id);
        return {
          notes: [note, ...otherNotes].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        };
      });
    } catch (error) {
      console.log( error);
    }
  }

  deleteNote = async (id: string): Promise<void> => {
    try {
      await storage.remove(id);
      this.setState(prevState => ({
        notes: prevState.notes.filter(n => n.id !== id),
        currentNote: prevState.currentNote?.id === id ? null : prevState.currentNote
      }));
    } catch (error) {
      console.log( error);
    }
  }

  syncNotes = async (): Promise<void> => {
    if (!this.state.isOnline) return;
    
    this.setState({ isSyncing: true });
    const unsyncedNotes = this.state.notes.filter(n => !n.synced);
    
    for (let note of unsyncedNotes) {
      const success = await api.sync(note);
      if (success) {
        const updatedNote = { ...note, synced: true };
        await this.saveNote(updatedNote);
      }
    }
    this.setState({ isSyncing: false });
  }

  setCurrentNote = (note: Note | null): void => {
    this.setState({ currentNote: note });
  }

  setSearchTerm = (term: string): void => {
    this.setState({ searchTerm: term });
  }

  getFilteredNotes = (): Note[] => {
    return this.state.notes.filter(note => 
      (note.title || '').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
      (note.content || '').toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  }

  render(): React.ReactNode {
    const contextValue: AppContextType = {
      notes: this.getFilteredNotes(),
      currentNote: this.state.currentNote,
      searchTerm: this.state.searchTerm,
      isOnline: this.state.isOnline,
      isSyncing: this.state.isSyncing,
      setCurrentNote: this.setCurrentNote,
      setSearchTerm: this.setSearchTerm,
      saveNote: this.saveNote,
      deleteNote: this.deleteNote,
      syncNotes: this.syncNotes
    };

    return (
      <AppContext.Provider value={contextValue}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}