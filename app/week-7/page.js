"use client";
import { useState } from "react";
import ItemList from "./item-list";
import itemsData from "./items.json";
import NewItem from "./new-item";

const Page = () => {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <main className="p-4 bg-gray-900 ">
      <h1 className="text-3xl font-bold text-white mb-4">Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
};

export default Page;
