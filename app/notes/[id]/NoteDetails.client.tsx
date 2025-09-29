'use client';

import { useState, useEffect } from 'react';
import type { Note } from '@/types/note';
import css from '@/components/NoteDetails/NoteDetails.module.css';

interface NoteDetailsClientProps {
  note: Note;
}

const NoteDetailsClient = ({ note }: NoteDetailsClientProps) => {
  const [formattedDate, setFormattedDate] = useState<string>('...');

  useEffect(() => {
    try {
      const date = new Date(note.createdAt);
      const formatted = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      setFormattedDate(formatted);
    } catch (error) {
      console.error('Failed to format date:', error);
      setFormattedDate('Invalid date');
    }
  }, [note.createdAt]);

  return (
    <div className={css.container}>
      <article className={css.item}>
        <header className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </header>
        <p className={css.content}>{note.content}</p>
        <time
          className={css.date}
          dateTime={note.createdAt}
          aria-label={`Created on ${formattedDate}`}
        >
          Created on: {formattedDate}
        </time>
      </article>
    </div>
  );
};

export default NoteDetailsClient;
