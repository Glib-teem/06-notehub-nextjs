import { fetchNoteById } from '@/lib/api/notes';
import NoteDetails from '@/components/NoteDetails/NoteDetails';
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
    return <NoteDetails note={note} />;
  } catch {
    notFound();
  }
}
