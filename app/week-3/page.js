import ItemList from "./item-list";

const Page = () => {
  return (
    <main className="p-4 bg-gray-900 ">
      <h1 className="text-3xl font-bold text-white mb-4">Shopping List</h1>
      <ItemList />
    </main>
  );
};

export default Page;
