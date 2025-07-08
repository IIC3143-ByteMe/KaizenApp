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
    console.error('❌ Error al obtener la pregunta del journal:', error);
    return '¿Cómo te sientes hoy?';
  }
};


export const getJournalEntryForDate = async (date: string): Promise<JournalEntry | null> => {
  try {
    console.log(`🔍 Buscando entrada para la fecha: ${date}`);
    
    const response = await api.get<JournalEntry>(`/journal/entry/${date}`);
    
    if (response.data && response.data.entry) {
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.log('No se encontró una entrada de journal para la fecha:', date, error);
    return null;
  }
};

export const saveJournalEntry = async (entry: string): Promise<boolean> => {
  try {
    await api.post('/journal/entry', { entry: entry.trim() });
    console.log('✅ Entrada de journal guardada exitosamente');
    return true;
  } catch (error) {
    console.error('❌ Error al guardar la entrada de journal:', error);
    return false;
  }
};
