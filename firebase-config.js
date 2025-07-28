// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWPrCiuY9yjvQMGiGzBDtndAa2FCLBX78",
  authDomain: "noxartechsln.firebaseapp.com",
  projectId: "noxartechsln",
  storageBucket: "noxartechsln.firebasestorage.app",
  messagingSenderId: "950592446485",
  appId: "1:950592446485:web:f4642f47cbbb3888b0ee1c",
  measurementId: "G-RT8E110P82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export for use in other modules
export { db, analytics };

// Function to submit quote request to Firebase
export async function submitQuoteRequest(formData) {
  try {
    const docRef = await addDoc(collection(db, "quote-requests"), {
      ...formData,
      timestamp: serverTimestamp(),
      status: "pending",
      source: "website"
    });
    console.log("Quote request submitted with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding quote request: ", error);
    return { success: false, error: error.message };
  }
}

// Function to submit newsletter subscription to Firebase
export async function submitNewsletterSubscription(email) {
  try {
    const docRef = await addDoc(collection(db, "newsletter-subscriptions"), {
      email: email,
      timestamp: serverTimestamp(),
      status: "active",
      source: "website"
    });
    console.log("Newsletter subscription submitted with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding newsletter subscription: ", error);
    return { success: false, error: error.message };
  }
}
