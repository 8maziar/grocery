import { FaTrash, FaEdit } from "react-icons/fa";

function SingleItem({ id, text, removeItem, editItem }) {
  return (
    <div className="flex justify-between px-2">
      <h5 className="text-sm font-semibold">{text}</h5>
      <div>
        <button className="ml-2 text-green-400 text-xs" onClick={() => editItem(id)}>
          <FaEdit />
        </button>
        <button className="ml-2 text-red-500 text-xs" onClick={() => removeItem(id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
export default SingleItem;
