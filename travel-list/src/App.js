import {useState} from "react";

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
    return (
        <div className="app">
            <Logo/>
            <Form/>
            <PackingList/>
            <Stats/>
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 💼</h1>
}

function Form() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(event) {
        event.preventDefault();

        if (!name) return;

        const newItem = {
            id: new Date().getTime(),
            name,
            quantity,
            packed: false,
        };

        initialItems.push(newItem);

        setName("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😊 trip?</h3>
            <select value={quantity} onChange={event => setQuantity(+event.target.value)}>
                {Array.from({length: 20}, (_, i) => i + 1)
                    .map(num =>
                        <option key={num} value={num}>{num}</option>
                    )}
            </select>
            <input type="text" placeholder="Item..." value={name} onChange={event => setName(event.target.value)}/>
            <button>Add</button>
        </form>
    );
}

function PackingList() {
    return (
        <div className="list">
            <h2>Packing List</h2>
            <ul>
                {initialItems.map(item => <Item key={item.id} {...item}/>)}
            </ul>
        </div>
    );
}

function Item({name, quantity, packed}) {
    return (
        <li>
            <span style={packed ? {textDecoration: "line-through"} : {}}>
                {quantity} {name}
            </span>
            <button>❌</button>

        </li>
    );
}

function Stats() {
    return (
        <footer>
            <em>💼 You have 0 items in your list, and you are already packed! X (X%)</em>
        </footer>
    );
}