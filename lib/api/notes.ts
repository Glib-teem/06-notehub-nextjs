import { apiClient } from '@/lib/api';
import type { Note, CreateNoteData } from '@/types/note';

export interface UpdateNoteParams {
  id: string;
  data: Partial<CreateNoteData>;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search } = params;
  const queryParams = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (search?.trim()) {
    queryParams.append('search', search.trim());
  }

  const { data } = await apiClient.get<FetchNotesResponse>(
    `/notes?${queryParams.toString()}`
  );
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await apiClient.get<{ note: Note }>(`/notes/${noteId}`);
  return data.note;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const { data } = await apiClient.post<{ note: Note }>('/notes', noteData);
  return data.note;
};

export const updateNote = async ({
  id,
  data: noteData,
}: UpdateNoteParams): Promise<Note> => {
  const { data } = await apiClient.put<{ note: Note }>(
    `/notes/${id}`,
    noteData
  );
  return data.note;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await apiClient.delete<{ note: Note }>(`/notes/${noteId}`);
  return data.note;
};
