import api from '../api';

interface JournalEntry {
  date: string;
  entry: string;
}

interface JournalQuestion {
  question: string;
}

export const getJournalQuestion = async (): Promise<string> => {
  try {
    const response = await api.get<JournalQuestion>('/journal/question');
    return response.data.question;
  } catch (error) {
    return '¿Cómo te sientes hoy?';
  }
};


export const getJournalEntryForDate = async (date: string): Promise<JournalEntry | null> => {
  try {    
    const response = await api.get<JournalEntry>(`/journal/entry/${date}`);
    
    if (response.data && response.data.entry) {
      return response.data;
    }
    
    return null;
  } catch (error) {
    return null;
  }
};

export const saveJournalEntry = async (entry: string, date?: string): Promise<boolean> => {
  try {
    const payload: { entry: string; date?: string } = { entry: entry.trim() };
    
    if (date) {
      payload.date = date;
    }
    
    await api.post('/journal/entry', payload);
    return true;
  } catch (error) {
    return false;
  }
};
