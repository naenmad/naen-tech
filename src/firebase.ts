import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";

// Define the type for Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyCgQD9rRCtJ9BpelFds39NTXt_hTtNCGf4",
  authDomain: "naen-tech.firebaseapp.com",
  projectId: "naen-tech",
  storageBucket: "naen-tech.appspot.com", // Fixed typo in the URL
  messagingSenderId: "843114593152",
  appId: "1:843114593152:web:f1566761f105c963309f65",
  measurementId: "G-W6NH0QTLF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Export everything that's needed
export { 
  db, 
  storage, 
  collection, 
  getDocs, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  ref,
  uploadBytes,
  getDownloadURL
};

// Define the return type for the test function
interface FirebaseTestResult {
  success: boolean;
  count?: number;
  firstDoc?: Record<string, any> | null;
  error?: string;
}

// Test function to check Firebase connection
export const testFirebaseConnection = async (): Promise<FirebaseTestResult> => {
  try {
    console.log("Testing Firebase connection...");
    const testCollection = collection(db, "projects");
    const snapshot = await getDocs(testCollection);
    console.log("Connection successful! Found", snapshot.docs.length, "documents");
    return {
      success: true,
      count: snapshot.docs.length,
      firstDoc: snapshot.docs[0]?.data() || null
    };
  } catch (error: any) {
    console.error("Firebase connection test failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};