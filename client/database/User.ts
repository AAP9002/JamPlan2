import { db } from '@/lib/firebase/config';
import { setDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


// Define a user type
type User = {
  id: string;
  name?: string;
  spotify_token: string;
  email?: string;
  createdAt: Date;
};

// Create a new user document
export const createUser = async (user: User) => {
  try {
    await setDoc(doc(db, 'users', user.id), { ...user, createdAt: new Date() });
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Get user by ID
export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Update user document
export const updateUser = async (userId: string, data: Partial<User>) => {
  try {
    await updateDoc(doc(db, 'users', userId), data);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Delete user by ID
export const deleteUser = async (userId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const sign_in_user_by_spotify_token = async (spotify_token: string, id:string) => {
    const user = await getDoc(doc(db, 'users', spotify_token));

    if (user.exists()) {
        return user.data() as User;
    } else {
        // create new user
        const new_user: User = {
            id: id,
            spotify_token: spotify_token,
            createdAt: new Date()
        }

        await createUser(new_user);

        return await getDoc

    }


}