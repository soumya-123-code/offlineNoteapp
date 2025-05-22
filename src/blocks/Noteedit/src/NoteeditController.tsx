import React, { Component } from 'react';
import { AppContext } from '../../../global/AppContext';
import { AppContextType, Note } from '../../../global/types';

export interface Props {}

export interface S {
showPreview: boolean;
}

export interface SS {}

class NoteeditController extends Component<Props, S, SS> {
   static contextType = AppContext;
    context!: AppContextType;
    private saveTimer: NodeJS.Timeout | null = null;
    
    constructor(props: Props) {
      super(props);
      this.state = {
        showPreview: false
      };
    }
    
    updateNote = (field: keyof Note, value: string): void => {
      const { currentNote, setCurrentNote, saveNote } = this.context;
      if (!currentNote) return;
      
      const updatedNote: Note = {
        ...currentNote,
        [field]: value,
        time: new Date().toISOString(),
        synced: false
      };
      setCurrentNote(updatedNote);
      
      if (this.saveTimer) {
        clearTimeout(this.saveTimer);
      }
      this.saveTimer = setTimeout(() => {
        saveNote(updatedNote);
      }, 500);
    }
    
    handleDelete = (): void => {
      const { currentNote, deleteNote } = this.context;
      if (!currentNote) return;
      
      if (window.confirm('Delete this note?')) {
        deleteNote(currentNote.id);
      }
    }
    
    convertToHtml = (text: string): string => {
      return text
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/# (.*)/g, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    }
  }
  

export default NoteeditController;
    