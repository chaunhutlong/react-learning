import {useState} from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialItems = [
    {id: 1, name: "Passport", quantity: 1, packed: false},
    {id: 2, name: "Suitcase", quantity: 1, packed: false},
    {id: 3, name: "Sunglasses", quantity: 1, packed: false},
    {id: 4, name: "Sandals", quantity: 1, packed: false},
    {id: 5, name: "Sunscreen", quantity: 1, packed: false},
    {id: 6, name: "Hat", quantity: 1, packed: false},
    {id: 7, name: "Laptop", quantity: 1, packed: false},
    {id: 8, name: "Phone", quantity: 1, packed: false},
    {id: 9, name: "Books", quantity: 3, packed: true},
    {id: 10, name: "Underwear", quantity: 10, packed: false},
];

export default function App() {
    const [items, setItems] = useState(initialItems);

    function handleAddItems(newItem) {
        setItems(prevItems => [...prevItems, newItem]);
    }

    function handleRemoveItem(id) {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems(prevItems => prevItems.map(item => {
            if (item.id !== id) return item;
            return {...item, packed: !item.packed};
        }));
    }

    function handleClearList() {
        const confirmed = window.confirm("Are you sure you want to clear the list?");

        if (confirmed) {
            setItems([]);
        }
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItem={handleAddItems}/>
            <PackingList items={items} onRemoveItem={handleRemoveItem} onToggleItem={handleToggleItem}
                         onClearList={handleClearList}/>
            <Stats items={items}/>
        </div>
    );
}




