import { db } from '@/lib/firebase/config';
import { setDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


// Define a recentTrack type
type RecentTrack = {
  id: string;
  user:string;
  createdAt: Date;
    track_name: string;
    track_id: string;
    artist_name: string;
    artist_id: string;
    album_cover_url: string;
};

// Create a new recentTrack document
export const createRecentTrack = async (recentTrack: RecentTrack) => {
  try {
    await setDoc(doc(db, 'recentTracks', recentTrack.id), { ...recentTrack, createdAt: new Date() });
    console.log('RecentTrack created successfully');
  } catch (error) {
    console.error('Error creating recentTrack:', error);
  }
};

// Get recentTrack by ID
export const getRecentTrack = async (recentTrackId: string): Promise<RecentTrack | null> => {
  try {
    const recentTrackDoc = await getDoc(doc(db, 'recentTracks', recentTrackId));
    if (recentTrackDoc.exists()) {
      return recentTrackDoc.data() as RecentTrack;
    } else {
      console.log('RecentTrack not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching recentTrack:', error);
    return null;
  }
};

// Update recentTrack document
export const updateRecentTrack = async (recentTrackId: string, data: Partial<RecentTrack>) => {
  try {
    await updateDoc(doc(db, 'recentTracks', recentTrackId), data);
    console.log('RecentTrack updated successfully');
  } catch (error) {
    console.error('Error updating recentTrack:', error);
  }
};

// Delete recentTrack by ID
export const deleteRecentTrack = async (recentTrackId: string) => {
  try {
    await deleteDoc(doc(db, 'recentTracks', recentTrackId));
    console.log('RecentTrack deleted successfully');
  } catch (error) {
    console.error('Error deleting recentTrack:', error);
  }
};
