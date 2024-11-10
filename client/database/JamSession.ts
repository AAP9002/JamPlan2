import { db } from '@/lib/firebase/config';
import { setDoc, doc, getDoc,getDocs, collection,updateDoc, deleteDoc } from 'firebase/firestore';


// Define a jamSession type
export type JamSession = {
  id: string;
  createdAt: Date;
  Members: string[];
    Songs: string[];
    Name: string;
};

// Create a new jamSession document
export const createJamSession = async (jamSession: JamSession) => {
  try {
    await setDoc(doc(db, 'jamSessions', jamSession.id), { ...jamSession, createdAt: new Date() });
    console.log('JamSession created successfully');
  } catch (error) {
    console.error('Error creating jamSession:', error);
  }
};

// Get jamSession by ID
export const getJamSession = async (jamSessionId: string): Promise<JamSession | null> => {
  try {
    const jamSessionDoc = await getDoc(doc(db, 'jamSessions', jamSessionId));
    if (jamSessionDoc.exists()) {
      return jamSessionDoc.data() as JamSession;
    } else {
      console.log('JamSession not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching jamSession:', error);
    return null;
  }
};

export const getAllJamSessions = async (): Promise<JamSession[]> => {
    try {
        const jamSessions:any = [];
        const querySnapshot = await getDocs(collection(db, 'jamSessions'));
        querySnapshot.forEach((doc) => {
        jamSessions.push(doc.data() as JamSession);
        });
        return jamSessions;
    } catch (error) {
        console.error('Error fetching jamSessions:', error);
        return [];
    }
    }

// Update jamSession document
export const updateJamSession = async (jamSessionId: string, data: Partial<JamSession>) => {
  try {
    await updateDoc(doc(db, 'jamSessions', jamSessionId), data);
    console.log('JamSession updated successfully');
  } catch (error) {
    console.error('Error updating jamSession:', error);
  }
};

// Delete jamSession by ID
export const deleteJamSession = async (jamSessionId: string) => {
  try {
    await deleteDoc(doc(db, 'jamSessions', jamSessionId));
    console.log('JamSession deleted successfully');
  } catch (error) {
    console.error('Error deleting jamSession:', error);
  }
};
