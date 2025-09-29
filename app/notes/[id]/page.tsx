import { fetchNoteById } from '@/lib/api/notes';
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';

interface NoteDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  try {
    const note = await fetchNoteById(params.id);
    return <NoteDetailsClient note={note} />;
  } catch {
    notFound();
  }
}
