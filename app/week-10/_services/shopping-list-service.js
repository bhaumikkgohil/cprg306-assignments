import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../_utils/firebase";

// Fetch shopping list items for a user
export const getItems = async (userId) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `users/${userId}/items`)
    ); // Path to Firestore collection
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })); // Map documents to an array of objects
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Add a new item to the shopping list
export const addItem = async (userId, newItem) => {
  try {
    const docRef = await addDoc(
      collection(db, `users/${userId}/items`),
      newItem
    );
    return docRef.id; // Return the ID of the new document
  } catch (error) {
    console.error("Error adding item:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const deleteItem = async (userId, itemId) => {
  try {
    const docRef = doc(db, `users/${userId}/items/${itemId}`); // Reference to the item document
    await deleteDoc(docRef); // Delete the document
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error; // Re-throw for further handling
  }
};
