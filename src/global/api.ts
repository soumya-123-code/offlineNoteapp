import { Note } from './types';

export const api = {
  url: 'https://jsonplaceholder.typicode.com/posts',
  
  async sync(note: Note): Promise<boolean> {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: note.title,
          body: note.content
        })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};