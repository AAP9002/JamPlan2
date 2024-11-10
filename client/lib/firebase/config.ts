import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define the type for the city data if needed
interface City {
  // Define fields expected in the city documents, e.g.:
  name: string;
  country: string;
  population: number;
}

// Get a list of cities from your database
async function getCities(db: Firestore): Promise<City[]> {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data() as City);
  return cityList;
}

export { db, getCities };
