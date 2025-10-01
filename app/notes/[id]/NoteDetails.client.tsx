'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from '@/components/NoteDetails/NoteDetails.module.css';

interface NoteDetailsClientProps {
  noteId: string;
}

const NoteDetailsClient = ({ noteId }: NoteDetailsClientProps) => {
  const {
    data: note,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader message="Loading note details..." />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error instanceof Error ? error.message : 'Failed to load note'}
        onRetry={refetch}
      />
    );
  }

  if (!note) {
    return <ErrorMessage message="Note not found" />;
  }

  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

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
