'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/notes';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  if (notes.length === 0) {
    return (
      <div className={css.empty}>
        <h3>No notes found</h3>
        <p>Create your first note to get started!</p>
      </div>
    );
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const isDeleting =
          deleteNoteMutation.isPending &&
          deleteNoteMutation.variables === note.id;

        return (
          <li
            key={note.id}
            className={css.listItem}
          >
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <div className={css.buttonGroup}>
                <Link
                  href={`/notes/${note.id}`}
                  className={css.link}
                >
                  View
                </Link>
                <button
                  className={css.button}
                  onClick={() => handleDelete(note.id)}
                  disabled={isDeleting}
                  aria-label={`Delete note titled ${note.title}`}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
