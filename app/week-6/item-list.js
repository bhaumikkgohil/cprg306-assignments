"use client";
import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

const ItemList = () => {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = () => {
    if (sortBy === "name") {
      return [...itemsData].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "category") {
      return [...itemsData].sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    }
    if (sortBy === "groupByCategory") {
      const grouped = itemsData.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});

      return Object.entries(grouped)
        .sort(([catA], [catB]) => catA.localeCompare(catB))
        .flatMap(([category, items]) =>
          items.sort((a, b) => a.name.localeCompare(b.name))
        );
    }
    return itemsData;
  };

  return (
    <div>
      <div className="mb-4 ">
        <div className="flex items-center">
          <h2 className="text-lg text-white">Sort By:</h2>
          <button
            className={`px-4 py-2 mr-2 ml-2 ${
              sortBy === "name" ? "bg-blue-500" : "bg-gray-500"
            } text-white rounded-lg hover:bg-blue-500`}
            onClick={() => setSortBy("name")}
          >
            Name
          </button>
          <button
            className={`px-4 py-2 mr-2 ${
              sortBy === "category" ? "bg-blue-500" : "bg-gray-500"
            } text-white rounded-lg hover:bg-blue-500`}
            onClick={() => setSortBy("category")}
          >
            Category
          </button>
          <button
            className={`px-4 py-2 ${
              sortBy === "groupByCategory" ? "bg-blue-500" : "bg-gray-500"
            } text-white rounded-lg hover:bg-blue-500`}
            onClick={() => setSortBy("groupByCategory")}
          >
            Grouped Category
          </button>
        </div>
      </div>

      <ul className="space-y-4">
        {sortBy === "groupByCategory"
          ? Object.entries(
              itemsData.reduce((acc, item) => {
                if (!acc[item.category]) {
                  acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
              }, {})
            )
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, items]) => (
                <li key={category}>
                  <h2 className="text-2xl font-bold capitalize text-white">
                    {category}
                  </h2>
                  <ul>
                    {items
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((item) => (
                        <Item
                          key={item.id}
                          name={item.name}
                          quantity={item.quantity}
                          category={item.category}
                        />
                      ))}
                  </ul>
                </li>
              ))
          : sortedItems().map((item) => (
              <Item
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                category={item.category}
              />
            ))}
      </ul>
    </div>
  );
};

export default ItemList;
