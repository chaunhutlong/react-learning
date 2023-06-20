import {useState} from "react";
import Item from "./Item";

export default function PackingList({items, onRemoveItem, onToggleItem, onClearList}) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems = [...items];

    if (sortBy === "name") {
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "packed") {
        sortedItems.sort((a, b) => a.packed - b.packed);
    } else if (sortBy === "quantity") {
        sortedItems.sort((a, b) => a.quantity - b.quantity);
    } else {
        sortedItems.sort((a, b) => a.id - b.id);
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map(item => <Item key={item.id} {...item} onRemoveItem={onRemoveItem}
                                               onToggleItem={onToggleItem}/>)}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="name">Sort by name</option>
                    <option value="quantity">Sort by quantity</option>
                    <option value="packed">Sort by packed</option>
                </select>
                <button onClick={onClearList}>Clear list</button>
            </div>
        </div>
    );
}