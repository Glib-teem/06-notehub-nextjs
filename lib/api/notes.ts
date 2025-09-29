import axios from 'axios';
import type { Note, CreateNoteData, UpdateNoteParams } from '@/types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

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
  data,
}: UpdateNoteParams): Promise<Note> => {
  const { data: response } = await apiClient.put<{ note: Note }>(
    `/notes/${id}`,
    data
  );
  return response.note;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await apiClient.delete<{ note: Note }>(`/notes/${noteId}`);
  return data.note;
};
