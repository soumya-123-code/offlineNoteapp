
import React, { Component } from 'react';


import NoteeditController, { Props } from './NoteeditController';

class Noteedit extends NoteeditController {
  constructor(props: Props) {
     super(props);
   }
 
   render(): React.ReactNode {
     const { currentNote } = this.context;
     const { showPreview } = this.state;
     
     if (!currentNote) {
       return (
         <div style={{
           flex: 1,
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           color: '#666'
         }}>
           Select a note to edit
         </div>
       );
     }
     
     return (
       <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
         <div style={{
           padding: '15px',
           borderBottom: '1px solid #ddd',
           display: 'flex',
           justifyContent: 'space-between',
           alignItems: 'center'
         }}>
           <input
             type="text"
             value={currentNote.title}
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updateNote('title', e.target.value)}
             style={{
               border: 'none',
               fontSize: '18px',
               fontWeight: 'bold',
               flex: 1,
               outline: 'none'
             }}
             placeholder="Note title..."
           />
           <div style={{ display: 'flex', gap: '10px' }}>
             <button
               onClick={() => this.setState({ showPreview: !showPreview })}
               style={{
                 padding: '5px 10px',
                 backgroundColor: '#6c757d',
                 color: 'white',
                 border: 'none',
                 borderRadius: '3px',
                 cursor: 'pointer'
               }}
             >
               {showPreview ? 'Edit' : 'Preview'}
             </button>
             <button
               onClick={this.handleDelete}
               style={{
                 padding: '5px 10px',
                 backgroundColor: '#dc3545',
                 color: 'white',
                 border: 'none',
                 borderRadius: '3px',
                 cursor: 'pointer'
               }}
             >
               Delete
             </button>
           </div>
         </div>
         
         <div style={{ flex: 1, padding: '15px' }}>
           {showPreview ? (
             <div
               style={{
                 height: '100%',
                 overflow: 'auto',
                 lineHeight: '1.5'
               }}
               dangerouslySetInnerHTML={{
                 __html: this.convertToHtml(currentNote.content || '')
               }}
             />
           ) : (
             <textarea
               value={currentNote.content}
               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.updateNote('content', e.target.value)}
               style={{
                 width: '100%',
                 height: '100%',
                 border: '1px solid #ddd',
                 borderRadius: '3px',
                 padding: '10px',
                 fontSize: '14px',
                 resize: 'none',
                 outline: 'none',
                 boxSizing: 'border-box'
               }}
               placeholder="Write your note here..."
             />
           )}
         </div>
       </div>
     );
   }
 }
 

export default Noteedit

    