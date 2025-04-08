import { useState } from "react";
import './todo-list.css'
const TodoList = () => {

    const [items, setItems] = useState([]);
    const [item, setItem] = useState("");
    const [checked, setChecked] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleEditItem = (index) => {

        const editItem = items[index];
        setEditIndex(index);
        setItem(editItem);
        setEdit(!edit);

    }
    const handleSaveItem = () => {
        const updatedItems = [...items];
        updatedItems[editIndex] = item; // Replace item at the index
        setItems(updatedItems);
        setItem("");
        setEdit(!edit);
        setEditIndex(null)
    }
    const handleDeleteItem = (i) => {
        setItems(items.filter((value, index) => i !== index))
    }

    const handleAddItem = () => {
        if (item.trim() !== "") {
            setItems((prevItems) => [...prevItems, item]);
            setItem("")
        }
        if (editIndex != null && item.trim() !== "") {
            setEdit(!edit);
        }

    }

    const handleItemPriorityUp = (index) => {
        if (index > 0) {
            let updatedItems = [...items];
            [updatedItems[index - 1], updatedItems[index]] = [updatedItems[index], updatedItems[index - 1]]

            setItems(updatedItems);

        }
    }

    const handleItemPriorityDown = (index) => {
        if (index < items.length - 1) {
            let updatedItems = [...items];

            [updatedItems[index], updatedItems[index + 1]] = [updatedItems[index + 1], updatedItems[index]]

            setItems(updatedItems);

        }
    }
    const handleMark = (e) => {
        const parentNode = e.target.parentNode.parentNode;
        const p = parentNode.querySelector('.item-name');
        setChecked(!checked);
        if (e.target.checked) {

            p.style.textDecoration = "line-through";
        } else {
            p.style.textDecoration = "none";
        }

    }

    return (
        <div className="container">
            <h2>ToDo List</h2>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter your productivity" value={item} onChange={(e) => setItem(e.target.value)
                } />
                {edit ? <button className="save-btn" onClick={() => handleSaveItem()}>Save</button> : null}
                {edit ? <button className="add-as-new-btn" onClick={() => handleAddItem()}>Add as New</button> : <button className="add-btn" onClick={() => handleAddItem()}>Add</button>}

            </div>
            <div className="list-item-container">
                {items.map((key, index) => {
                    return <div key={index} className="item-container">
                        <div className="item-name">{key} </div>
                        <div className="btn-container">
                            <button onClick={() => handleEditItem(index)} className="edit-btn">Edit</button> <button onClick={() => handleDeleteItem(index)} className="delete-btn">Delete</button> <button className="upside-btn" onClick={() => handleItemPriorityUp(index)}>☝</button> <button className="downside-btn" onClick={() => handleItemPriorityDown(index)}>👇</button>
                            <input type="checkbox" onChange={(e) => handleMark(e)} value={checked} />
                        </div>
                    </div>
                })}
            </div>

        </div>
    )

}

export default TodoList;

