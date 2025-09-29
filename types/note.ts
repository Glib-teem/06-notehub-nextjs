export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: string;
  title: string;
  content?: string;
  tag: NoteTag;
  createdAt: string;
}

export interface CreateNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface UpdateNoteParams {
  id: string;
  data: Partial<CreateNoteData>;
}

export type NoteFormValues = CreateNoteData;
