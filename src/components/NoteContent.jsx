import React from 'react';
import { useParams } from 'react-router-dom';

const NoteContent = ({ notes }) => {
  const { noteId } = useParams();
  const note = notes.find(n => n.id === noteId);

  if (!note) {
    return <main className="content"><h2>Note not found</h2></main>;
  }

  return (
    <main className="content">
      <article>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </article>
    </main>
  );
};

export default NoteContent;