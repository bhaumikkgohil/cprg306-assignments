const Item = ({ name, quantity, category, onSelect, onDelete }) => {
  console.log("onDelete Function:", onDelete); // debugging onDelete
  return (
    <li className="p-2 bg-gray-700 text-white rounded-lg flex justify-between items-center hover:bg-gray-500 cursor-pointer mb-2 w-96">
      <div onClick={onSelect} className="flex flex-col">
        <span className="font-bold text-xl">{name}</span>
        <p className="text-sm">
          Buy {quantity} in {category}
        </p>
      </div>
      <button
        className="ml-4 text-black hover:text-white hover:bg-red-600 font-bold bg-slate-400 p-2 rounded-lg"
        onClick={onDelete}
      >
        Delete
      </button>
    </li>
  );
};

export default Item;
