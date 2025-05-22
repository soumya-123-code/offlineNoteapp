import React, { Component } from 'react';
import { AppContext } from '../../../global/AppContext';
import { AppContextType, Note } from '../../../global/types';
import { makeId } from '../../../global/utils'
export interface Props {}

export interface S {
  input1: string;
  input2: string;
}

export interface SS {}

class NotesController extends Component<Props, S, SS> {
  static contextType = AppContext;
  context!: AppContextType;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      input1: '',
      input2: ''
    };
  }
  
  createNewNote = (): void => {
    const { saveNote, setCurrentNote } = this.context;
    const newNote: Note = {
      id: makeId(),
      title: 'New Note',
      content: '',
      time: new Date().toISOString(),
      synced: false
    };
    saveNote(newNote);
    setCurrentNote(newNote);
  }
}

export default NotesController;