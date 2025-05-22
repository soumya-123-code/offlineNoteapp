export interface Note {
  id: string;
  title: string;
  content: string;
  time: string;
  synced: boolean;
}

export interface AppContextType {
  notes: Note[];
  currentNote: Note | null;
  searchTerm: string;
  isOnline: boolean;
  isSyncing: boolean;
  setCurrentNote: (note: Note | null) => void;
  setSearchTerm: (term: string) => void;
  saveNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  syncNotes: () => Promise<void>;
}

export interface AppProviderState {
  notes: Note[];
  currentNote: Note | null;
  searchTerm: string;
  isOnline: boolean;
  isSyncing: boolean;
}

export interface AppProviderProps {
  children: React.ReactNode;
}