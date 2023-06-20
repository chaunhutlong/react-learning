import {useState} from "react";

export default function Form({onAddItem}) {
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

        onAddItem(newItem);

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