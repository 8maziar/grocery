import { useEffect, useState, useRef } from "react";
import SingleItem from "./SingleItem";

import Alert from "./Alert";

function App() {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("list")) || []);
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({ state: false, msg: "", color: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState("");

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      setAlert({ state: true, msg: "Please enter your item", color: "red" });
    } else if (text && !isEditing) {
      const id = new Date().getTime();
      const item = { id, text };
      setList([...list, item]);
      setText("");
      setAlert({ state: true, msg: "Item added", color: "lime" });
    } else {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            item.text = text;
          }
          return item;
        })
      );
      setText("");
      setAlert({ state: true, msg: "Item edited", color: "lime" });
      setIsEditing(false);
    }
  };

  useEffect(() => {
    let alertTimer = setTimeout(() => {
      setAlert({ state: false, msg: "", color: "" });
    }, 1500);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alert]);

  // edit locale storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    setAlert({ state: true, msg: "Item removed", color: "red" });
    setIsEditing(false);
    setText("");
  };

  const removeAllItems = () => {
    setAlert({ state: true, msg: "All items removed", color: "red" });
    setList([]);
    setText("");
    setIsEditing(false);
  };

  const editItem = (id) => {
    setIsEditing(true);
    setText(list.find((item) => item.id === id).text);
    setEditID(id);
    inputRef.current.focus();
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-sm w-96">
      <Alert {...alert} />
      <h1 className="font-semibold my-2 tracking-wider">Grocery Bud</h1>
      <form className="flex" onSubmit={handleSubmit}>
        <input className="bg-sky-100 outline-sky-600 w-full py-1 px-2 text-xs" type="text" placeholder="e.x.egg" value={text} onChange={(e) => setText(e.target.value)} ref={inputRef} />
        <button className="text-xs font-semibold p-1 rounded-tr-sm rounded-br-sm bg-sky-300 hover:bg-sky-400" type="submit">
          {isEditing ? "Edit" : "Submit"}
        </button>
      </form>
      {list.length > 0 && (
        <div className="my-4">
          <div>
            {list.map((item, index) => {
              return <SingleItem key={item.id} {...item} removeItem={removeItem} editItem={editItem} />;
            })}
          </div>
          <button className="text-xs text-red-600 font-semibold hover:text-red-900" onClick={removeAllItems}>
            Clear Items
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
