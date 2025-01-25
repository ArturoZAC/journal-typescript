export interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
  active: Note | null;
}


export interface Note {
  id: string;
  title: string;
  body: string;
  date: number | null;
  imageUrls?: string[];
}