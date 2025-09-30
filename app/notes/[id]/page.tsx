import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/notes';
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient noteId={id} />
      </HydrationBoundary>
    );
  } catch {
    notFound();
  }
}
