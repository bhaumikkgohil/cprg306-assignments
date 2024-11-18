"use client";
import { useRouter } from "next/compat/router";
import { useEffect, useState } from "react";
import {
  addItem,
  deleteItem,
  getItems,
} from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import NewItem from "./new-item";

const Page = () => {
  const { user, loading } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  const loadItems = async () => {
    if (user) {
      try {
        const fetchedItems = await getItems(user.uid); // Fetch items for the current user
        setItems(fetchedItems); // Update state with fetched items
      } catch (error) {
        console.error("Error loading items:", error);
      }
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/week-9"); // Redirect to landing if not logged in
    } else if (user) {
      loadItems(); // Load items if user is logged in
    }
  }, [user, loading, router]);

  if (loading || !user)
    return (
      <div className="flex justify-center items-center bg-black h-screen">
        <div className="w-12 h-12 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );

  const handleAddItem = async (newItem) => {
    try {
      const itemId = await addItem(user.uid, newItem); // Add item and get the ID
      const itemWithId = { ...newItem, id: itemId }; // Include the ID in the new item
      setItems([...items, itemWithId]); // Update state to include the new item
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(user.uid, itemId); // Delete from Firestore
      setItems(items.filter((item) => item.id !== itemId)); // Remove from local state
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleItemSelect = (item) => {
    const cleanedName = item.name
      .split(",")[0]
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g, "")
      .trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="p-4 bg-gray-900 h-screen ">
      <h1 className="text-3xl font-bold text-white mb-4">Shopping List</h1>
      <div className="flex">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList
            items={items}
            onItemSelect={handleItemSelect}
            onDeleteItem={handleDeleteItem}
          />
        </div>
        <div className="ml-4 mt-6">
          <h1 className="text-3xl font-bold text-white">Meal Ideas</h1>
          {/* Conditional Rendering: If an item is selected, show meal ideas */}
          {selectedItemName ? (
            <MealIdeas ingredient={selectedItemName} />
          ) : (
            <h2 className="text-xl text-white">
              Select an item to see meal ideas
            </h2>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
