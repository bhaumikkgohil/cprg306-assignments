const Item = ({ name, quantity, category }) => {
  return (
    <li className="p-2 bg-gray-700 text-white rounded-sm mb-2 w-96">
      <span className="font-bold text-xl">{name}</span>
      <p className="text-sm">
        Buy {quantity} in {category}
      </p>
    </li>
  );
};

export default Item;
